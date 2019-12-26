// src/App.js

import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import comparator from "../../utils/comparator";
import Modal from '../Modal/modal2';
import { buildKey, getFilteredData, assignScore } from '../../lib/dataManipulator';
import { sanitizeData } from '../../lib/sanitizeData';

// Heap Initialization
const { Heap } = require('heap-js');

// Variable Declarations.
let MAX_SIZE = 100,
    RETRY_INTERVAL_TIME = 10000,
    oldTimeout = setTimeout,
    allTimeout = [];


function setTimoutNew(fn, timeout) {
  const id = oldTimeout(fn, timeout);
  allTimeout.push(id);
  return id;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    /* Initialize Heap with custom comparator, max size */
    this.maxHeap = new Heap(comparator);
    this.maxHeap.init([]);

    this.data = '';

    this.state = {
      data: this.maxHeap.toArray(),
      filterEnabled: false,
      filterData: {}
    };

    this.columns = [
      {
        Header: "Business Name",
        accessor: "business_name"
      },
      {
        Header: "Address",
        accessor: "business_address"
      },
      {
        Header: "Zipcode",
        accessor: "business_postal_code"
      },
      {
        Header: "Phone",
        accessor: "business_phone_number"
      },
      {
        Header: "Inspection Score",
        accessor: "inspection_score"
      },
      {
        Header: "Risk",
        accessor: "risk_category"
      },
      {
        Header: "Confidence Grade",
        accessor: "grade"
      }
    ];
  }

  componentDidMount() {
    this.fetchRestaurantData()
      .then(res => sanitizeData(res))
      .then(data => this.setState({ data })  );

  }

  /* 
   * Async Function: 
   * Retrieve Restaurant data will fetch data from the following Data sets:
   * https://data.sfgov.org/Health-and-Social-Services/Restaurant-Scores-LIVES-Standard/pyih-qa8i
   * 
   */

  fetchRestaurantData() {
    return fetch('https://data.sfgov.org/resource/pyih-qa8i.json')
      .then(data => data.json())
      .then(res => {
        this.data = res;
        return res;
      });
  }

  /* 
   * Callback when Filter is selected.
   */
  onFilterSelected(filterData) {
    const key =  buildKey(filterData);
    const data = this.maxHeap.toArray();
    const result = getFilteredData(filterData, data, key);
    // this.clearAllTimeout();
    console.log("Filter Results ::::", result);

    // Enable Filter State.
    this.setState({ 
      filterEnabled: true, 
      filterData: Object.assign({}, filterData)
    });

    // Stop the event source && Update Filter on UI.
    this.updateFiltersOnUI(result);
  }

  
  updateFiltersOnUI(filterData) {
    // this.eventSource.close();
    console.log("FilteredData", filterData);
    this.setState({data: filterData});
    // this.fetchFilteredData.bind(this)();
  }


  fetchFilteredData() {
    const filerData = this.state.filterData;
    this.onFilterSelected(filerData);
  }

  setTimoutNew(fn, timeout) {
    const id = oldTimeout(fn, timeout);
    allTimeout.push(id);
    return id;
  }

  clearAllTimeout() {
    allTimeout.forEach(each => clearTimeout(each));
    allTimeout = [];
  }

  debounce(fn, timer) {
    let id;
    return function(...args) {
      clearTimeout(id);
      id = setTimoutNew(() => {
        fn(...args);
      }, timer);
    }
  }

  render() {
    return (
      <div className="App">
        <Modal onFilterSelected={this.onFilterSelected.bind(this)} />
        <ReactTable filterable data={this.state.data} columns={this.columns} />
      </div>
    );
  }
}

export default Dashboard;
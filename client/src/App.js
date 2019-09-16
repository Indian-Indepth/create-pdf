import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';


class App extends Component {
  state = {
    name: '',
    receiptId: 0,
    price: 0,
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input type="number" placeholder="Price" name="price" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;

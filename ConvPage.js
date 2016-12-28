'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#6E2141'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    // height: 500
    backgroundColor: '#EBA14D',
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch',
},
flowR: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'auto',
  justifyContent: 'center',
  marginTop: 10,
},
buttonText: {
  fontSize: 18,
  color: '#6E2143',
  alignSelf: 'center'
},
button: {
  height: 36,
  // flex: 1,
  flexDirection: 'row',
  backgroundColor: '#6E2143',
//   borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
buttonz1: {
  marginRight: 10,
},
buttonz: {
  height: 36,
  // flex: 1,
  flexDirection: 'row',
  backgroundColor: '#EBC18F',
  borderColor: '#EBC18F',
  borderWidth: 1,
  borderRadius: 8,
  alignSelf: 'stretch',
  justifyContent: 'center',
},
buttonzdo1: {
  marginRight: 10,
},
buttonzdo: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#EBC18F',
  borderColor: '#EBC18F',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center',
  alignItems: 'center',
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#EBC18F',
  backgroundColor: '#EBC18F',
  borderRadius: 8,
  color: '#6E2143',
  justifyContent: 'center',
  textAlign: 'center',
},
multsign: {
    marginBottom: 0,
    marginTop: 10,
}
});

function denominateMn(dollar) {
    var trillion=Math.floor(dollar/1000000000000);
	var trillions=trillion.toString();
	var dollar=dollar%1000000000000;
	var billion=Math.floor(dollar/1000000000);
	var billions=billion.toString();
	var dollar=dollar%1000000000;
	var million=Math.floor(dollar/1000000);
	var millions=million.toString();
	var dollar=dollar%1000000;
	var thousand=Math.floor(dollar/1000);
	var thousands=thousand.toString();
	var dollar=dollar%1000;
	var rest=dollar;
	var rests=rest.toString();
	// var dollars=trillions+" trillion "+billions+" billion "+millions+" million "+thousand+" thousand and "+rests+" dollars.";
	return [trillions, billions, millions, thousands, rests];
}

function denominateCr(rupee) {
    var crore=Math.floor(rupee/10000000);
	var crores=crore.toString();
	var rupee=rupee%10000000;
	var lakh=Math.floor(rupee/100000);
	var lakhs=lakh.toString();
	var rupee=rupee%100000;
	var thousand=Math.floor(rupee/1000);
	var thousands=thousand.toString();
	var rupee=rupee%1000;
	var rest=rupee;
	var rests=rest.toString();
	// var rupees=crores+" crore "+lakhs+" lakh "+thousands+" thousand and "+rests+" rupees.";
	return [crores, lakhs, thousands, rests];
}

function zeroPrep(numb, length) {
    console.log("ZEROPREP");
    var retNumb = numb.toString();
    console.log(retNumb);
    while (retNumb.length < length) {
        retNumb = '0' + retNumb;
    }
    return retNumb
}

class ConvPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    Number: '',
    Mult: '',
    result: 'Result will be displayed here',
    };
  }
  //------------------------------------------
  onNumberChanged(event) {
    console.log('onSearchTextChanged trigged');
    this.setState({ Number : event.nativeEvent.text });
    console.log(this.state.Number);
  }
  onMultChanged(event) {
    console.log('onMultTextChanged trigged');
    this.setState({ Mult: event.nativeEvent.text });
    console.log(this.state.Mult);
  }
  _handleResponseDtoR(response) {
      var rate = response.USD_INR.val.toString();
      this.setState({ Mult: rate});
      console.log(this.state.Mult);
  }
  _handleResponseRtoD(response) {
      var rate = response.INR_USD.val.toString();
      this.setState({ Mult: rate});
      console.log(this.state.Mult);
  }
  onDtoRClick(event) {
      console.log('click DtoR');
      // REPLACE WITH FETCH RATE FROM YF
      var query = "https://free.currencyconverterapi.com/api/v3/convert?q=USD_INR&compact=y";
      console.log("QUERY + ", query);
      fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponseDtoR(json))
      .catch(error => console.log("ERROR", error));
  }
  onRtoDClick(event) {
      console.log('click RtoD');
      // REPLACE WITH FETCH RATE FROM YF
      var query = "https://free.currencyconverterapi.com/api/v3/convert?q=INR_USD&compact=y";
      console.log("QUERY + ", query);
      fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponseRtoD(json))
      .catch(error => console.log("ERROR", error));
  }

  onMillionareClick(event) {
      var trillions, billions, millions, thousands, rests;
      if (this.state.Mult == '') {
          this.state.Mult = 1;
      }
      var numero = this.state.Mult*this.state.Number; 
      var arrDenom = denominateMn(numero);
      trillions = arrDenom[0];
      billions = arrDenom[1];
      millions = arrDenom[2];
      thousands = arrDenom[3];
      rests = arrDenom[4];
	  var rpStr = "" ; // trillions+" trillion "+billions+" billion "+millions+" million "+thousands+" thousand and "+rests+" dollars.";
      var numb = "";

      if (true) {
          var nRests = rests;
          if ((billions != 0 || millions != 0) || thousands != 0) {
            nRests = zeroPrep(rests, 3);
          }
          numb = nRests + " " + numb;
          rpStr = rests;
      }
      if ((billions != 0 || millions != 0) || (thousands != 0)) {
          var nThou = thousands
          if (billions != 0 || millions != 0) {
            nThou = zeroPrep(thousands, 3);
          }
          numb = nThou + " " + numb;
          rpStr = thousands + " thousand and " + rpStr;
      }
      if (billions != 0 || millions != 0) {
          var nMil = millions;
          if (billions != 0) {
            nMil = zeroPrep(millions, 3);
          }
          numb = nMil + " " + numb;
          rpStr = millions + " Million " + rpStr;
      }
      if (billions != 0) {
          numb = billions + " " + numb;
          rpStr = billions + " billon " + rpStr;
      }

      var finRes = numb + "\n\n" + rpStr
      this.setState({ result: finRes })
  }
  onCrorepatiClick(event) {
      var crores, lakhs, thousands, rests;
      if (this.state.Mult == '') {
          this.state.Mult = 1;
      }
      var numero = this.state.Mult*this.state.Number; 
      var arrDenom = denominateCr(numero);
      crores = arrDenom[0];
      lakhs = arrDenom[1];
      thousands = arrDenom[2];
      rests = arrDenom[3];
	  var rpStr = "" ; // = crores+" crore "+lakhs+" lakh "+thousands+" thousand and "+rests+" rupees.";
      var numb = "";
      if (true) {
          var nRests = rests;
          if ((crores != 0 || lakhs != 0) || thousands != 0) {
            nRests = zeroPrep(rests, 3);
          }
          numb = nRests + " " + numb;
          rpStr = rests;
      }
      if ((crores != 0 || lakhs != 0) || (thousands != 0)) {
          var nThou = thousands
          if (crores != 0 || lakhs != 0) {
            nThou = zeroPrep(thousands, 2);
          }
          numb = nThou + " " + numb;
          rpStr = thousands + " thousand and " + rpStr;
      }
      if (crores != 0 || lakhs != 0) {
          var nLakhs = lakhs;
          if (crores != 0) {
            nLakhs = zeroPrep(lakhs, 2);
          }
          numb = nLakhs + " " + numb;
          rpStr = lakhs + " lakh " + rpStr;
      }
      if (crores != 0) {
          numb = crores + " " + numb;
          rpStr = crores + " crore " + rpStr;
      }

      var finalRes = numb + "\n\n" + rpStr

      this.setState({ result: finalRes })
  }
  //------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
            A utility to get denominations in the Millions and the Lakhs system and make currency conversions
        </Text>

      <View style={styles.flowRight}>
        <TextInput
        style={styles.searchInput}
        value={this.state.Number}
        keyboardType = 'numeric'
        onChange={this.onNumberChanged.bind(this)}
        placeholder='Enter a Number'/>
      </View>

      <Text style={styles.multsign}>x</Text>

      <View style={styles.flowR}>
            <TouchableHighlight style={[styles.buttonz1, styles.buttonz]}
            underlayColor='#99d9f4' onPress={this.onDtoRClick.bind(this)}>
                <Text style={styles.buttonText}>$ → ₹</Text>
            </TouchableHighlight>
            
            <TextInput
            style={styles.searchInput}
            value={this.state.Mult}
            keyboardType= 'numeric'
            onChange={this.onMultChanged.bind(this)}
            placeholder='multiply by (optional)'/>

            <TouchableHighlight style={styles.buttonz}
            underlayColor='#99d9f4' onPress={this.onRtoDClick.bind(this)}>
                <Text style={styles.buttonText}>₹ → $</Text>
            </TouchableHighlight>
      </View>

      <View style={styles.flowR}>
            <TouchableHighlight style={[styles.buttonzdo1, styles.buttonzdo]}
            underlayColor='#99d9f4' onPress={this.onMillionareClick.bind(this)}>
                <Text style={styles.buttonText}>Millionare</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonzdo}
            underlayColor='#99d9f4' onPress={this.onCrorepatiClick.bind(this)}>
                <Text style={styles.buttonText}>Crorepati</Text>
            </TouchableHighlight>
      </View>

      <Text>
        - - - - - - - - - - - - - - - - - - - - - - -
      </Text>  

      <Text style={styles.description}>
      {this.state.result}
      </Text> 

      </View>
    );
  }
}

module.exports = ConvPage;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Formulario extends React.Component {

    state = {
        total: 0,
        depositoHistory: [],
        saqueHistory: [],
    }

    Saque(){
        let saque = [];
        for(let i = 0;i < this.state.saqueHistory.length ; i++){ 
            saque.push(<p>R$: {this.state.saqueHistory[i]}</p>);
        }
        return saque;
    }
    Deposito(){
        let deposito = [];
        for(let i = 0;i < this.state.depositoHistory.length ; i++){
            deposito.push(<p>R$: {this.state.depositoHistory[i]}</p>);
        }
        return deposito;
    }

    handleClick(valor,tipo){
        
       if(tipo === "entrada"){
            let grana = 0;

            if(valor === "" ){
                alert('informe um valor');
            }else{
                this.setState({
                    depositoHistory: [...this.state.depositoHistory,valor]
                    
                },() => {
                    for(let i = 0;i < this.state.depositoHistory.length ; i++){ 
                        grana = grana + parseInt(this.state.depositoHistory[i]);
                    }
                    this.setState({total:grana});
                });
                document.getElementById("valor").value = "";
            }
       }else{
            let total;
            let saqueVar = document.getElementById("valor").value;
            
            if(saqueVar > this.state.total){
                alert("Valor maior do que o total")
            }else if(saqueVar === ""){
                alert('informe um valor');
            }else{
                this.setState({
                    saqueHistory: [...this.state.saqueHistory,valor]
                }, () =>{
                    let saque = this.state.saqueHistory[this.state.saqueHistory.length - 1];
                    total = parseInt(this.state.total) - saque;
                    this.setState({total:total});
                })
                document.getElementById("valor").value = "";
            }
       }
    }

    render(){
        return(
            <div>
                <div className="content">
                    <div className="col-md-4">
                        <h3>Historico Deposito</h3>
                        <center>{this.Deposito()}</center>
                    </div>
                    <div className="col-md-4" id="form">
                    <h3>Controle de Gastos</h3> 
                        <input className="form form-control" id="valor" name="valor"  type="number"/><br/>

                        <select className="form-control"  name="tipo" id="tipo">
                            <option value="entrada">Deposito</option>
                            <option value="saque">Saque</option>
                        </select><br/>
                        
                        <input type="button" onClick={() => this.handleClick(document.getElementById('valor').value,document.getElementById('tipo').value)} value="Enviar" className="form-control btn btn-primary"/>
                    </div>
                    <div className="col-md-4">
                        <h3>Historico Saque</h3>
                        <center>{this.Saque()}</center>
                    </div>
                </div>
                <div className="footer">
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <h4>Total: </h4>
                    </div>
                    <div className="col-md-1">
                        <h4>R$: {this.state.total}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Formulario />, document.getElementById('root')
);
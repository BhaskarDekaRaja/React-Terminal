import React, { Component } from 'react';
import Terminal from 'terminal-in-react';
import {
    http
} from './apiInterceptor';


class ReactTerminal extends Component {


    Response = "print ms";
    listNum = 10;

    searchQuery=(arg1,arg2,print)=>{
        
        this.listNum = (arg2 &&  !isNaN(arg2))  ? arg2 : 10; 
        if(arg1){
        http
        .post("https://api.github.com/graphql",{
            query: `
            query {
                search(
                  type:REPOSITORY, 
                  query: """
                    ${arg1}
                  """,
                  first: ${this.listNum}
                ) {
                  repos: edges {
                    repo: node {
                      ... on Repository {
                        url
                        name            
                      }
                    }
                  }
                }
              }
              `
          }).then((response)=>{
                let data = response.data.data.search.repos;
                if(data.length > 0){
                    for(let i = 0;i<data.length;i++){
                        print(`${data[i].repo.name}: ${data[i].repo.url}`)
                    }
                }else{
                    print("No repository available")                
        }
          }
          )
        }
    }

    render() {
        return (
            <div  style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
              }}>
                <Terminal
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          
          commands={{
            search:(args,print)=>{this.searchQuery(args[1],args[2],print)},
            popup: () => alert('Terminal in React')
          }}
          descriptions={{
            'search':'search github repo',
            alert: 'alert', popup: 'alert'
          }}
          msg='Repository Search'
        />
            </div>
        )
    }
}

export default ReactTerminal

import React, { Component } from 'react';
import './GithubRepos.css';

class GithubRepos extends Component {
    constructor(props) {
        super(props);
        this.onSelectedLang=this.onSelectedLang.bind(this);

        this.state={
        	repos:[],
        	lang:'javascript',
          loading:false
        }
    }

    fetchRepos(lang){
    	fetch(`https://api.github.com/search/repositories?q=${lang}&sort=stars&order=desc`).then
    	(res=>res.json()).then
    	(data=>this.setState({repos:data.items,loading:true}));
    }

    componentDidMount(){
    	this.fetchRepos(this.state.lang)
    }

    componentDidUpdate(prevProps,prevState){
    	if(prevState.lang !== this.state.lang){
    		this.fetchRepos(this.state.lang)
    	}
    }
    
    onSelectedLang(lang)
    {
    	this.setState({lang,loading:false})
    }


    render() {
    	const langs=['javascript','java','html','css'];

    	const repoList=this.state.repos.map((repo)=>
    		<div
        className="text-center m-4"
    		key={repo.id}>
    		<li><img src={repo.owner.avatar_url} /></li>
    		<li>{repo.owner.login}</li>
    		<li>{repo.stargazers_count}</li>
    		</div>
    		)
        return (
           <div>
           <h2 className="text-center
           d-flex 
           justify-content-center">
           {langs.map((lang,index)=>
            <ul key={index}>
           	<li
            style={lang === this.state.lang?{color:"red"}:null}
           	onClick={()=>this.onSelectedLang(lang)}
           	>{lang}</li>
            </ul>
            )
       		}
           </h2>
           <div
           className="d-flex
           flex-wrap
           justify-content-around">
           {(!this.state.loading)?<p>Loading...</p>:repoList}
           </div>
           </div> 
        );
    }
}




export default GithubRepos;

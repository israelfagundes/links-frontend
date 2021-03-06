import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../../Layouts/Manage';
import { linkList, setLinkToRemove, linkRemove } from '../../../actions/LinkActions'; 

const Links = ({ links, linkList, setLinkToRemove, linkToRemove, linkRemove }) => {
  useEffect(() => {
    linkList();
  }, [linkList]);
 
  const cancelDelete = () => {
    setLinkToRemove(null);
  }

  const confirmDelete = () => linkToRemove ? linkRemove(linkToRemove) : null; 

  return (
    <Layout>
      <div className="row">
        <div className="col">
          <h1>Links</h1>
        </div>
        <div className="col text-right align-self-bottom pt-2">
          <Link to="/manage/links/create" className="btn btn-primary">
            Add
          </Link>
        </div>
      </div>

      {links && links.length ? links.map(link => {
      
        const handleDelete = link => {
          setLinkToRemove(link);
        };
      
        const border = linkToRemove && linkToRemove.id === link.id
          ? 'border border-danger rounded'
          : 'border border-transparent'
      
        return (
          <div key={link.id} className={`pb-2 pt-2 pl-3 pr-3 d-flex flex-row justify-content-between ${border}`}>
            <div className="pr-3">
              <img src="https://via.placeholder.com/100" alt="Placeholder"/>
            </div>
            <div className="align-self-center">
              <span className="text-primary clearfix">{link.label}</span>
              <a href={link.url} rel="noreferrer noopener" target="_blank" className="text-primary clearfix">{link.url}</a>
            </div>
            <div className="ml-auto p-2 clearfix">
              <Link to={`/manage/links/edit/${link.id}`}>Edit</Link>
              <button onClick={() => handleDelete(link)} className="btn btn-danger btn-icon btn-round btn-add-margin">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </button>
            </div>
          </div>
        )}) : null}

      {linkToRemove ? (
      <div className="alert alert-danger rounded float-center shadow-bold">
        <h4 className="alert-heading">Delete Confirmation</h4>
        <p>Are you sure you want to delete? This action cannot be undone.</p>
        <hr />
        <div className="d-flex justify-content-between" >
          <button className="btn btn-outline-light" onClick={cancelDelete} >Cancel</button>
          <button className="btn btn-danger" onClick={confirmDelete} >Delete</button>
        </div>
      </div>
      ) : null }
    </Layout>
  )
}

const mapStateToProps = state => {
  return {
    links: state.link.links,
    linkToRemove: state.link.linkToRemove
  };
}

export default connect(mapStateToProps, { linkList, setLinkToRemove, linkRemove })(Links);
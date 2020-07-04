import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { linkGet, linkUpdate } from '../../../../actions/LinkActions';
import { getFormData } from '../../../../helpers/form';

import Layout from '../../../Layouts/Manage';
import FormGroup from '../../../../components/FormGroup';
import FormCheck from '../../../../components/FormCheck';

const Edit = ({ link, linkGet, linkUpdate }) => {
  const { id } = useParams();
  
  useEffect(() => {
    linkGet(id);
  }, [id, linkGet]);
  
  const submitHandler = e => {
    e.preventDefault();
    const data = getFormData(e);
    linkUpdate(id, data);   

    return <Redirect to="/manage/links" />
  };
  
  return (
    <Layout>
      <h1>Edit Link</h1>
        <div>
          <form onSubmit={submitHandler}>
            <FormGroup label="Label" name="label" data={link} type="text" />
            <FormGroup label="Url" name="url" data={link} type="text" />
            <FormCheck data={link} />
            <div>
              <button className="btn btn-primary btn-round">Submit</button>
            </div>
          </form>
        </div>
    </Layout>
  );
}

const mapStateToProps = state => {
  return { link: state.link.link };
}

export default connect(mapStateToProps, { linkGet, linkUpdate })(Edit);
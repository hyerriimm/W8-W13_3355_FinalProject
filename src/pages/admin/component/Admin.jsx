import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { __getReportedMembers, __getReportedPosts, __getReportedComments } from '../../../redux/modules/admin';

const Admin = () => {
  const dispatch = useDispatch();
  const { ReportedMembers, ReportedPosts, ReportedComments } = useSelector((state) => state.admin);

  // console.log('ReportedMembers', ReportedMembers);
  // console.log('ReportedPosts', ReportedPosts);
  // console.log('ReportedComments', ReportedComments);
  // console.log('렌더링 몇 번');

  useEffect(()=>{
    dispatch( __getReportedMembers());
    dispatch( __getReportedPosts());
    dispatch( __getReportedComments());
  },[]);


  return (
    <div>
        신고내역 컴포넌트 Admin.jsx
    </div>
  );
};

export default Admin;

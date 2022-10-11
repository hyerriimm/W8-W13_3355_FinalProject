import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { __getReportedList } from '../../../redux/modules/admin';
import BasicTabs from './AdminTap';

const Admin = () => {
  const dispatch = useDispatch();
  const { ReportedList } = useSelector((state) => state.admin);
  console.log('ReportedList', ReportedList);
  // memberList, postList, commentList

  useEffect(()=>{
    dispatch( __getReportedList());
  },[ReportedList.length]);


  return (
    <div>
      <BasicTabs 
      postList={ReportedList.postList}
      commentList={ReportedList.commentList}
      memberList={ReportedList.memberList}
      />
    </div>
  );
};

export default Admin;

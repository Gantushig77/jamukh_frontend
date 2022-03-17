import ax_instance from '../helpers/axios_instance';

const getListOfMembershipTypes = () => {
  return ax_instance.get('/membership/get-membership-types');
};


const getMembershipSend = (id) => {
  return ax_instance.post('/member-request/create-request',{'req_subs':id
});
};


export { getListOfMembershipTypes , getMembershipSend};

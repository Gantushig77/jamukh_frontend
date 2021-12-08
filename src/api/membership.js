import ax_instance from '../helpers/axios_instance';

const getListOfMembershipTypes = () => {
  return ax_instance.get('/membership/get-membership-types');
};

export { getListOfMembershipTypes };

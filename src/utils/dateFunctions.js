export function graphql_Id_to_Date(_id) {
  return parseInt(_id?.substring(0, 8), 16) * 1000;
}

export function id_to_real_date(_id) {
  return new Date(graphql_Id_to_Date(_id));
}

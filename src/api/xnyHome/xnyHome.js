import request from "@/request";

export const getMachineVo = (lineId) =>
  request({
    url: "/api/ne-equipment-service/NELargeScreen/getMachineVo",
    method: "get",
    params: {
      lineId,
    },
  });
export const getCustomerMachineVo = (lineId) =>
  request({
    url: "/api/ne-equipment-service/NELargeScreen/customer/machineVo",
    method: "get",
    params: {
      lineId,
    },
  });

export const getlineList = (data) =>
  request({
    url: "/api/ne-equipment-service/preset/enum/list",
    method: "post",
    data,
  });
export const getlineListCustomer = (data) =>
  request({
    url: "/api/ne-equipment-service/preset/enum/customer/list",
    method: "post",
    data,
  });

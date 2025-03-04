import request from "@/request";

export const getMachineVo = () =>
  request({
    url: "/api/ne-equipment-service/NELargeScreen/getMachineVo",
    method: "get",
  });

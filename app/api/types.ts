import type { Tables } from "./supabase";

export interface Paginate<T=any> {
    data: T;
    page: number;
    count: number;
    total: number;
    size: number;
}

export namespace Searchor {
  export type Detail = Tables<'searchors'>
  export type Type = Tables<'searchor_types'>
  export type Item = Type & { searchors: Detail[] }
}
export namespace Note {
  export type Type = Tables<'note_types'>
  export type Content = Tables<'note_contents'>
}
export namespace Video {
  export type Detail = Tables<'videos'>
  export type Origin = Tables<'video_origins'>
}


export namespace YNP {
    export type Account = Tables<'younongpais'>

    
  // {"userInfo":{"userId":330382,"nickName":"辞言","userName":"用户64766","recommendNum":0,"phone":"18617161134","header":"","balance":352,"commissionAmount":0,"usedCommissionAmount":0,"freezeCommissionAmount":0,"email":"","gender":1,"birthday":1771402305,"referrerId":172981,"proxyId":172981,"directId":172950,"unionId":172178,"topId":0,"recommendIds":",172981,172950,172939,172178,1,0,","updateTime":1788127594,"userState":1,"createTime":1771402305,"isLockRelation":0,"openMiniShop":0,"beginCreateTime":null,"endCreateTime":null,"beginEndTime":null,"endEndTime":null,"referrerName":null,"referrerPhone":null,"proxyName":null,"proxyPhone":null,"directName":null,"directPhone":null,"unionName":null,"unionPhone":null,"topName":null,"topPhone":null,"userStateName":null,"memberType":0,"upgradeStationTime":0,"upgradeWarehouseTime":0,"memberTypeName":null,"wxQrcode":null,"isOfficial":0,"verifyState":0,"certNo":"","certFrontImg":"","certBackImg":"","userInviteNo":"0","inviteNo":"0","directInviteNo":"0","recommendId":172981,"recommendIdsRev":",0,1,172178,172939,172950,172981,","dateTime":20260218,"userFromType":1,"groupCode":"","isForbid":0,"remark":"","userLabel":"","wxCache":null,"h5Cache":null,"freezeBalance":0,"usedBalance":100,"integral":0,"freezeIntegral":0,"usedIntegral":0,"growth":10248,"allGrowth":10248,"vipLevel":0,"vipTime":0,"vipOpenTime":0,"znPoint":0,"znFreezePoint":0,"znUsedPoint":0,"feedPoint":0,"feedUsedPoint":0,"sendToUserId":0,"openRights":0,"openRightsTime":0,"isWithdraw":0,"inOutState":null,"inOutType":null,"productTimeStart":null,"productTimeEnd":null,"orderId":null,"money":null,"month":null,"logState":null,"logType":null,"toUserId":null,"startTime":null,"endTime":null,"isHasLike":null,"isHasFans":null,"isHasComment":null,"drawNum":1,"growthLevel":5,"isDirectInviteUp":0,"directInviteUser":0,"sendNum":0,"setSendNumState":0,"isCountyServer":0,"stockNum":0,"usedStockNum":0,"inviteProxyChance":0,"sendNumDateTime":0,"countyServTag":0,"milkCloudStock":0,"usedMilkCloudStock":0,"milkCouponNum":0,"usedMilkCouponNum":0,"freezeMilkCouponNum":0,"isReadProtocol":1,"isShowData":0,"dataUnionIds":"","openLtgsTime":0,"virtualPhone":"","virtualUsedPoint":0,"virtualTotalPoint":0,"virtualType":0,"virtualBindTime":0,"virtualUnbindTime":0,"virtualFormalTime":0,"salesmanId":0,"earnConfig":0,"inviteSendStoreCount":0,"isStoreInviteUp":0,"storeInviteUser":0,"boundNum":null,"formalNum":null,"unBindNum":null,"salesmanNum":null,"permissionChecked":null,"teamMilkCouponNum":null,"receivedSendNum":null,"selfInitiateNum":null,"themInitiateNum":null,"selfWaitAuditNum":null,"themWaitAuditNum":null,"selfWaitShipNum":null,"themWaitShipNum":null,"milkNum":null,"waitDrawNum":null,"endDrawNum":null,"startReceiptTime":null,"endReceiptTime":null,"keyword":null,"usedHmCouponAmount":null,"hmCouponAmount":null,"usedExchangeCouponAmount":null,"exchangeCouponAmount":null},"salesmanId":0,"isCountyServer":0,"recommendId":172981,"nickName":"辞言","bindPhone":1,"accessToken":"017a84dddda9407597a6eb060c02a0dc","userName":"用户64766","userId":"330382","isOfficial":0,"vipLevel":0,"header":"","operationUserType":0,"memberType":0,"user":{"userId":330382,"userAccount":"18617161134","pwd":"597c17e2c973c254e8e2cdf588ed2e4c","payPwd":"","hmbPwd":"","userState":1,"createTime":1771402305}}
    export interface User {
      salesmanId: number;
      isCountyServer: number;
      recommendId: number;
      nickName: string;
      bindPhone: number;
      accessToken: string;
      userName: string;
      userId: string;        // 顶层 userId 是字符串类型（如 "330382"）
      isOfficial: number;
      vipLevel: number;
      header: string;
      operationUserType: number;
      memberType: number;
      user: any;
      userInfo: UserInfo;
    }

    export interface UserInfo {
      userId: number;        // userInfo 内的 userId 也是数字
      nickName: string;
      userName: string;
      recommendNum: number;
      phone: string;
      header: string;
      balance: number;
      commissionAmount: number;
      usedCommissionAmount: number;
      freezeCommissionAmount: number;
      email: string;
      gender: number;
      birthday: number;
      referrerId: number;
      proxyId: number;
      directId: number;
      unionId: number;
      topId: number;
      recommendIds: string;
      updateTime: number;
      userState: number;
      createTime: number;
      isLockRelation: number;
      openMiniShop: number;
      beginCreateTime: number | null;
      endCreateTime: number | null;
      beginEndTime: number | null;
      endEndTime: number | null;
      referrerName: string | null;
      referrerPhone: string | null;
      proxyName: string | null;
      proxyPhone: string | null;
      directName: string | null;
      directPhone: string | null;
      unionName: string | null;
      unionPhone: string | null;
      topName: string | null;
      topPhone: string | null;
      userStateName: string | null;
      memberType: number;
      upgradeStationTime: number;
      upgradeWarehouseTime: number;
      memberTypeName: string | null;
      wxQrcode: string | null;
      isOfficial: number;
      verifyState: number;
      certNo: string;
      certFrontImg: string;
      certBackImg: string;
      userInviteNo: string;
      inviteNo: string;
      directInviteNo: string;
      recommendId: number;
      recommendIdsRev: string;
      dateTime: number;
      userFromType: number;
      groupCode: string;
      isForbid: number;
      remark: string;
      userLabel: string;
      wxCache: string | null;
      h5Cache: string | null;
      freezeBalance: number;
      usedBalance: number;
      integral: number;
      freezeIntegral: number;
      usedIntegral: number;
      growth: number;
      allGrowth: number;
      vipLevel: number;
      vipTime: number;
      vipOpenTime: number;
      znPoint: number;
      znFreezePoint: number;
      znUsedPoint: number;
      feedPoint: number;
      feedUsedPoint: number;
      sendToUserId: number;
      openRights: number;
      openRightsTime: number;
      isWithdraw: number;
      inOutState: number | null;
      inOutType: number | null;
      productTimeStart: number | null;
      productTimeEnd: number | null;
      orderId: number | null;
      money: number | null;
      month: number | null;
      logState: number | null;
      logType: number | null;
      toUserId: number | null;
      startTime: number | null;
      endTime: number | null;
      isHasLike: number | null;
      isHasFans: number | null;
      isHasComment: number | null;
      drawNum: number;
      growthLevel: number;
      isDirectInviteUp: number;
      directInviteUser: number;
      sendNum: number;
      setSendNumState: number;
      isCountyServer: number;
      stockNum: number;
      usedStockNum: number;
      inviteProxyChance: number;
      sendNumDateTime: number;
      countyServTag: number;
      milkCloudStock: number;
      usedMilkCloudStock: number;
      milkCouponNum: number;
      usedMilkCouponNum: number;
      freezeMilkCouponNum: number;
      isReadProtocol: number;
      isShowData: number;
      dataUnionIds: string;
      openLtgsTime: number;
      virtualPhone: string;
      virtualUsedPoint: number;
      virtualTotalPoint: number;
      virtualType: number;
      virtualBindTime: number;
      virtualUnbindTime: number;
      virtualFormalTime: number;
      salesmanId: number;
      earnConfig: number;
      inviteSendStoreCount: number;
      isStoreInviteUp: number;
      storeInviteUser: number;
      boundNum: number | null;
      formalNum: number | null;
      unBindNum: number | null;
      salesmanNum: number | null;
      permissionChecked: number | null;
      teamMilkCouponNum: number | null;
      receivedSendNum: number | null;
      selfInitiateNum: number | null;
      themInitiateNum: number | null;
      selfWaitAuditNum: number | null;
      themWaitAuditNum: number | null;
      selfWaitShipNum: number | null;
      themWaitShipNum: number | null;
      milkNum: number | null;
      waitDrawNum: number | null;
      endDrawNum: number | null;
      startReceiptTime: number | null;
      endReceiptTime: number | null;
      keyword: string | null;
      usedHmCouponAmount: number | null;
      hmCouponAmount: number | null;
      usedExchangeCouponAmount: number | null;
      exchangeCouponAmount: number | null;
    }
    export interface CouponInfo {
      userId: number;
      allAmount: number;
      dueAmount: number;
    }
    export interface CouponLog {
      logId: number;
      userId: number;
      couponId: number;
      orderId: number;
      amount: number;
      dateTime: number;
      isEnd: number;
      logType: number;
      des: "抽奖频道获得",
      createTime: number;
      endTime: number;
      isRed: number;
      userName?: string,
      phone?: any;
      header?: any;
      memberType?: any;
      isCountyServer?: any;
      beginCreateTime?: any;
      endCreateTime?: any;
      typeName?: any;
      memberTypeName?: any;
    }
    export interface DrawInfo {
        balance: number;
        freezeBalance: number;
        totalBalance: number;
        tocUsedBalance: number;
        getCashImg: string;
    }
    export interface DrawLog {
        logId: number;
        fromLogId: number;
        des: string;
        userId: number;
        hideLog: number;
        bizId: number;
        bizParam: string;
        amount: number;
        fromUser: number;
        inOutState: number;
        inOutType: number;
        inOutProp: number;
        createTime: number;
        productTime: number;
    }
    export interface GrowthInfo {
        growth: number;
        allGrowth: number;
        isSign: number;
    }
    export interface GrowthLog {
        growthId: number;
        userId: number;
        growthType: number;
        typeName: string;
        growthProp: number;
        createTime: number;
        dateYmd: string;
        growth: number;
        bizId: number;
        userName: null | string;
        headUrl: null | string;
        phone: null | string;
        growth1: null | number;
        growth2: null | number;
        beginTime: null | number;
        endTime: null | number;
        isSystem: null | number;
    }
    export interface ZhunongInfo {
        userId?: number;
        header: string;
        nickName: string;
        memberType: number;
        isCountyServer: number;
        znPoint: number;
        znUsedPoint: number;
        znFreezePoint: number;
        recommendProducts: {
            productMainId: number;
            [key: string]: any;
        }[];
        specials: {
            specialId: number;
            [key: string]: any;
        }[];
        topAdvs?: any;

    }
    export interface Task {
        taskType: string;
        taskName: string;
        taskDes: string;
        isFinish: number;
        finishTimes: number;
        allTimes: number;
        growth: number;
        maxGrowth: number;
    }

}
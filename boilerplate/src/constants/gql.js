export const SEND_CODE = `mutation($mobile: String!) {
  result: sendVerifyCode(
    userType: PROPAGATOR
    mobile: $mobile
    stage: LOGIN 
  )
}`
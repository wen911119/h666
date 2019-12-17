let BASE_URL
// eslint-disable-next-line
if ($BUILD_TARGET$ === 'production') {
  BASE_URL = 'https://mapi.shangyantong.com'
} else {
  BASE_URL = 'https://uapi.dev.quancheng-ec.com'
}

export const MEETING_URL = BASE_URL + '/meetings'

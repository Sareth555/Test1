import Request from '@clik.asia/clik-shared-app/apis';

export default class MyQRCodeAPI extends Request {

    constructor() {
        super()
        this.config.method = 'get'
        this.config.url = '/shared-api/my-qr-code';
    }

}
import Request from '@clik.asia/clik-shared-app/apis';

export default class MyProfileApi extends Request {

    constructor() {
        super()
        this.config.url = '/consumer-api/my-profile';
    }

}
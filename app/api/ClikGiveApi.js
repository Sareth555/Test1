import Request from '@clik.asia/clik-shared-app/apis';

export default class ClikGiveApi extends Request {

    constructor() {
        super()
        this.config.method = 'post';
        this.config.url = '/consumer-api/give';
    }

}
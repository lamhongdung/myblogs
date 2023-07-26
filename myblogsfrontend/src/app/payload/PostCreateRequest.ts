export class PostCreateRequest {

    constructor(

        // creator id
        public creatorid: number,

        // title
        public title: string,

        // category id
        public categoryid: number,

        // post content
        public content: string,

    ) {

    }

}
export class PostCreateRequest {

    constructor(

        // creator id
        public creatorid: number,

        // title
        public title: string,

        // category id
        public categoryid: number,

        // ticket content
        public content: string,

    ) {

    }

}
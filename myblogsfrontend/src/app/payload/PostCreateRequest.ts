export class PostCreateRequest {

    constructor(

        // title
        public title: string,

        // category id
        public categoryid: number,

        // creator id
        public creatorid: number,

        // ticket content
        public content: string,

    ) {

    }

}
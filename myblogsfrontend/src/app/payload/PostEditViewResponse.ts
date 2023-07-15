export class PostEditViewResponse {

    constructor(

        // post id
        public postid: number,
        // title
        public title: string,
        // creator email
        public creatorEmail: string,

        // post content
        public content: string,

        // last update date time
        public lastUpdateDatetime: Date,

        // category id
        public categoryid: number,
        // category id + category name
        public category: string,


    ) {

    }

}
export class PostEditViewResponse {

    constructor(

        // post id
        public postid: number,

        public creator: string,

        // title
        public title: string,

        // category id
        public categoryid: number,
        
        public categoryName: string,

        // category id + category name
        public category: string,

        // post content
        public content: string,

        // the post is created on this datetime
        public createDatetime: Date,

        // last update date time
        public lastUpdateDatetime: Date,


    ) {

    }

}
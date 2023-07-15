export class PostEditRequest {

    constructor(

        // post id
        public postid: number,

        // title
        public title: string,

        // category id
        public categoryid: number,

        // creator id
        public creatorid: number,

        // content
        public content: string


    ) {

    }

}
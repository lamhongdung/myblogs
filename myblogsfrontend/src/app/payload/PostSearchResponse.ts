// list of posts by category id
export class PostSearchResponse {

    constructor(

        public postid: number,
        public categoryid: number,
        public categoryName: string,
        public title: string,
        public content: string,
        public createDatetime: Date,
        public creatorid: number,
        public creatorEmail: string,
        public postStatusid: number,
        public postStatusName: string

    ) {

    }

}

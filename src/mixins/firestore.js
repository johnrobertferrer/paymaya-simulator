import { db } from "../firebase/db";

export default {
    data() {
        return {
            room: []
        };
    },
    methods: {
        async updateRecord(id, data) {
            let that = this;

            db.collection("room")
                .doc(id)
                .set(data)
                .then(() => {
                    that.afterUpdateRecord();
                })
                .catch(() => {
                    // console.log(error);
                }); 
        },

        afterUpdateRecord() {
            return
        }
    },
    firestore: {
        room: db.collection("room")
    }
};
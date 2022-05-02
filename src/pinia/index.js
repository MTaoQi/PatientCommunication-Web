import { defineStore } from 'pinia';

const useStore = defineStore({
  id: 'patientState',
  state: () => ({
    Userislogin:500,
    text:'',
    name:'',
    // Communicationid:''
  }),
  getters: {
  },
  actions: {
      setUserislogin(num){
          this.Userislogin=num;
      },
      // setCommunicationid(cid){
      //     this.Communicationid=cid;
      // }
      setText(text){
        this.text=text;
      },
      setName(name){
        this.name=name;
      }

  }   

});

export default useStore;

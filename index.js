class TwoLineAssistantAction {
        constructor(q,a = ''){
          this.break = '<break time="400ms"/>';
          this.items = [];
          this.done = false;
          this.type = "jokes";
        }

        setType(s){
          this.type = s;
        }

        add(q,a=''){
          var j = [q,a];
          this.items.push(j);
        }

        setConv(conv){
          this.conv = conv;
        }

        getItem(){
          var j = this.items;
          var i, r;

          r = '<speak><p>';

          if(this.conv.user.storage.twoLinerItems.length >= j.length ){
            r = "We're out of "+this.type+"!";
            this.done = true;
          } else {
            do{
              i = Math.floor(Math.random()*j.length);
            } while(this.conv.user.storage.twoLinerItems.includes(i));
          
            var item = j[i];
            this.conv.user.storage.twoLinerItems.push(i);

          
            if(this.type == "jokes"){
              r += item[0]; 
              if(item[1] != '') r += this.break + item[1];
              r += '</p><audio src="https://actions.google.com/sounds/v1/cartoon/punchline_drum.ogg" clipEnd="5s">Punchline Drum</audio>';
            } else if(this.type == "quotes"){
              r += '"'+item[0];
              if(item[1] != '') r += '"'+ this.break + " -"+item[1];
              r += '</p>';
             }

             r += '</speak>'
          }

            return r;
        }
}

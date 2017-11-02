(() => {

  let contactBtn = document.getElementsByClassName('launch-overlay')

  Array.from(contactBtn).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      const btn = document.createElement('div')
      btn.classList.add('overlay')

      const randNumber = Math.floor(Math.random() * 90000) + 10000;

      btn.innerHTML =
      `
      <div id="closeOverlay">Close <span class="bold-text">x</span></div>
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">

            <form id="msgForm">
              <div class="form-group">
                <label for="Name">Your Name</label>
                <input type="text" class="form-control" id="nameInput" placeholder="Enter name" required>
                </div>
                <div class="form-group">
                  <label for="Email">Email address</label>
                  <input type="email" class="form-control" id="emailInput" placeholder="Enter email" required>
                  </div>
                  <div class="form-group">
                    <label for="Subject">Subject</label>
                    <input type="text" class="form-control" id="subjectInput" placeholder="Subject" required>
                    </div>

                    <div class="form-group">
                      <label for="Message">Your Message</label>
                      <textarea class="form-control" id="messageInput" rows="3" required></textarea>
                    </div>

                    <div class="form-check">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" id="checkInput">
                          Check me if ${randNumber} is an even number. Otherwise don't.
                        </label>
                      </div>

                      <input type="text" style="display:none;" id="randNumber" value="${randNumber}" />
                      <br />
                      <button type="submit" class="btn btn-primary" id="submitMessage">Submit</button>
                      <span id="feedback"></span>
                    </form>

                  </div>
                </div>
              </div>
              `;

              document.body.appendChild(btn);
              document.body.style.overflow = "hidden";

              btn.style.width = '100%';

              document.getElementById('closeOverlay').addEventListener('click', (e) => {
                e.preventDefault();

                btn.remove();
                document.body.style.overflowY = "scroll";
              })


              document.getElementById("submitMessage").addEventListener('click', (e) => {
                e.preventDefault();

                const name = document.getElementById("nameInput");
                const email = document.getElementById("emailInput");
                const subject = document.getElementById("subjectInput");
                const message = document.getElementById("messageInput");
                const check = document.getElementById("checkInput");
                const randomNumber = document.getElementById("randNumber");

                if (name.value === "" || email.value === "" || subject.value === "" || message.value === ""){
                  errorMsg("All fields are required");
                } else if (check.checked === true && randomNumber.value % 2 === 1 || check.checked === false && randomNumber.value % 2 === 0  ) {
                  errorMsg("You have failed the number test! ... Good Bye :)");
                  setInterval(function(){
                    btn.remove();
                    document.body.style.overflowY = "scroll";
                  }, 3000)
                } else if (check.checked === true && randomNumber.value % 2 === 0 || check.checked === false && randomNumber.value % 2 === 1 ){
                  console.log("True Blue")

                  const msgObj = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    subject: "PORTFOLIO SITE MESSAGE: " + subject.value.trim(),
                    message: message.value.trim()
                  }

                  $.post("/send", msgObj, (data) => {

                    if (data === 'error'){
                      errorMsg('Uh oh... Something went horribly wrong! :( ');
                    }
                    if (data === 'success'){
                      successMsg("Thank you! :)")

                      setInterval(function(){
                        btn.remove();
                        document.body.style.overflowY = "scroll";
                      }, 3000);
                    }

                  })
                }
              })
            })
          })

          // ================================ Play Audio Recording of Name ===============
          const soundRecording = document.querySelector('.sound-recording')

          soundRecording.addEventListener('click', (e) => {
            e.preventDefault()
            const audio = new Audio('../audio/saveliyrec.mp3')
            audio.play()
          })
          // ==============================================================================

          // ================================ Display Error ===============================

          function errorMsg(msg){
            const feedback = document.getElementById('feedback');
            feedback.classList.add("feedback-error")
            feedback.innerHTML = msg;
          };

          // ==============================================================================

          // ================================ Success Message ===============================

          function successMsg(msg){
            const feedback = document.getElementById('feedback');
            feedback.classList.add("feedback-success")
            feedback.innerHTML = msg;
          };

          // ==============================================================================



        })()

function fetchUser() {
    document.getElementById("loginuser").innerHTML = `Authenticating...`;
  
    return new Promise((resolve, reject) => {
      fetch("./07_2_31_Challenge_fetchuser_login_Async_Await.json")
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(error => {
              console.log(error);
              reject(error);
          });
    });
  }
  
  function login(users, userInput, passwordInput) {
      if(users.user === userInput && users.password === passwordInput) {
          document.getElementById("loginuser").innerHTML = `Welcome, ${userInput}`;
      } else {
          document.getElementById("loginuser").innerHTML = "Invalid login";
      }
  }
  
  async function useAdmin(userInput, passwordInput) {
      try {
          const users = await fetchUser();
          login(users, userInput, passwordInput);
      } catch (error) {
          document.getElementById("loginuser").innerHTML = "Error fetching user data";
      }
  }
  
  document.getElementById("loginButton").addEventListener("click", (event) => {
    event.preventDefault();
      //read input
      const userInput = document.getElementById("userInput").value;
      const passwordInput = document.getElementById("passwordInput").value;
      useAdmin(userInput, passwordInput);
  });
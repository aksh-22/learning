function userManagerModule() {
  const userList: string[] = [];

  // public function
  function addUser(uName: string) {
    userList.push(uName);
    _printConfirmation(uName);
  }

  // private function
  function _printConfirmation(uName: string) {
    console.log("User added name -", uName);
  }

  return { addNewUser: addUser };
}

const UserManager = userManagerModule();

UserManager.addNewUser("Test 1");

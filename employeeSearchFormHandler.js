    const searchFormHandler = event => {
        event.preventDefault();

        const searchedLocationName = searchedLocation === null ? '' : searchedLocation[0].name;
        const searchedDepartmentName = searchedDepartment === null ? '' : searchedDepartment['mcdl01'];
        const usersList = users;
        const searchResults = [];
        const searchedName = userName.toLowerCase();

        if (userName.length === 0 && searchedLocation === null && searchedDepartment === null) {
            setIsSearched(false);

        } else if (userName.length === 0 && searchedLocation !== null && searchedDepartment === null) {
            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].locationName === searchedLocationName) {
                    searchResults.push(usersList[i]);
                }
            }
            setIsSearched(true);
            setSearchResults(searchResults);

        } else if (userName.length === 0 && searchedLocation !== null && searchedDepartment !== null) {
            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].locationName === searchedLocationName && usersList[i].departmentName === searchedDepartmentName) {
                    searchResults.push(usersList[i]);
                }
            }
            setIsSearched(true);
            setSearchResults(searchResults);

        } else if (userName.length === 0 && searchedLocation === null && searchedDepartment !== null) {
            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].departmentName === searchedDepartmentName) {
                    searchResults.push(usersList[i]);
                }
            }
            setIsSearched(true);
            setSearchResults(searchResults);

        } else if (userName.length > 0 && searchedLocation !== null && searchedDepartment === null) {
            for (let i = 0; i < usersList.length; i++) {
                const usersListName = usersList[i].name.toLowerCase();

                if (usersListName.indexOf(searchedName) !== -1 && usersList[i].locationName === searchedLocationName) {
                    searchResults.push(usersList[i]);
                }
            }
            setIsSearched(true);
            setSearchResults(searchResults);

        } else if (userName.length > 0 && searchedLocation === null && searchedDepartment === null) {
            for (let i = 0; i < usersList.length; i++) {
                const usersListName = usersList[i].name.toLowerCase();

                if (usersListName.indexOf(searchedName) !== -1) {
                    searchResults.push(usersList[i]);
                }
            }
            setIsSearched(true);
            setSearchResults(searchResults);

        } else if (userName.length > 0 && searchedLocation === null && searchedDepartment !== null) {
            for (let i = 0; i < usersList.length; i++) {
                const usersListName = usersList[i].name.toLowerCase();

                if (usersListName.indexOf(searchedName) !== -1 && usersList[i].departmentName === searchedDepartmentName) {
                    searchResults.push(usersList[i]);
                }
            }
            setIsSearched(true);
            setSearchResults(searchResults);

        } else if (userName.length > 0 && searchedLocation !== null && searchedDepartment !== null) {
            for (let i = 0; i < usersList.length; i++) {
                const usersListName = usersList[i].name.toLowerCase();

                if (usersListName.indexOf(searchedName) !== -1 && usersList[i].locationName === searchedLocationName && usersList[i].departmentName === searchedDepartmentName) {
                    searchResults.push(usersList[i]);
                }
            }
            setIsSearched(true);
            setSearchResults(searchResults);
            console.log(searchResults);
        }
    }

  

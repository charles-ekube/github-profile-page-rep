
window.addEventListener("load", function () {
  document.getElementById("login-user").onsubmit = (e) => {
    e.preventDefault();
    const submitBtn = document.getElementsByClassName("submit-btn");
    const loginPage = document.getElementsByClassName(
      "login-page-container"
    )[0];
    const displayDataPage =
      document.getElementsByClassName("profile-details")[0];
    const userName = document.getElementById("login-input").value;

    const baseUrl = `https://api.github.com/graphql`;
    const tk1 = "ghp_ClbVsl";
    const tk2 = "lZluXcTIUK";
    const tk3 = "9oMoziKQSo";
    const tk4 = "T3eZ0Y4h7W";
    const token = tk1 + tk2 + tk3 + tk4;
    const queryData = `{
        user(login: "${userName}") {
          avatarUrl
          bio
          email
          followers {
            totalCount
          }
          following {
            totalCount
          }
          location
          login
          name
          repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            nodes {
              name
              updatedAt
              stargazerCount
              forkCount
              languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                  name
                  color
                }
              }
              description
              url
              parent {
                forkCount
                name
                licenseInfo {
                  name
                }
                languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                  nodes {
                    color
                    name
                  }
                }
                isPrivate
                nameWithOwner
                url
              }
            }
          }
          twitterUsername
          websiteUrl
          status {
            emojiHTML
            emoji
            message
          }
          starredRepositories {
            totalCount
          }
          updatedAt
        }
      }`;
    const queryOptions = {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryData,
      }),
    };
    const getRepositoryData = async () => {
      try {
        const response = await fetch(baseUrl, queryOptions);
        const data = await response.json();
        const reqData = data.data.user;
        console.log(data);

        const { repositories } = reqData;
        const userDetails = data.data;
        console.log(reqData);
        if (userDetails.name === null) {
          alert("enter username");
        } else {
          loginPage.style.display = "none";
          displayDataPage.style.display = "block";
          fetchedData(userDetails);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRepositoryData();

  };

});



window.onscroll = function () {
  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  if (scrollTop >= document.getElementsByTagName("main")[0].offsetTop) {
    document.getElementsByClassName("tabs")[0].style.paddingTop = "30px";
    document.getElementById("profileAvatar")[0].style.position = 'fixed';
  } else {
    document.getElementsByClassName("tabs")[0].style.paddingTop = "90px";
  }
}

// mobile nav toggle function
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');

mobileNavToggle.onclick = () => {

  if (mobileNavDropdown.style.display === 'none') {

    mobileNavDropdown.style.display = 'block';
  }
  else {
    mobileNavDropdown.style.display = 'none';
  }
}


// tabs function
const toggleTabs = (e, tabName) => {

  const tabsContent = document.getElementsByClassName('tabs-content-item');
  const tabLinks = document.getElementsByClassName('tabs-list-item');

  for (var i = 0; i < tabsContent.length; i++) {
    tabsContent[i].style.display = 'none';
  }

  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace('active', '');

  }

  document.getElementById(tabName).style.display = 'block';
  document.getElementById('tab-img')[0].style.display = "none";
  e.currentTarget.className += 'active';

}

// UserDetails functions

const fetchedData = (userDetails) => {

  var repositories = userDetails;
  const repoList = repositories.user.repositories.nodes;
  const userProfile = repositories.user;
  // console.log(repoList);
  // console.log(userProfile);



  // updating navbar avatar and username

  // username 
  let navUsername = document.getElementById('nav-username');
  navUsername.innerHTML = userProfile.name;

  let mobileNavUsername = document.getElementById('mobile-nav-username');
  mobileNavUsername.innerHTML = userProfile.name;

  // avatar 

  let navAvatar = document.getElementById('user-avatar');
  navAvatar.src = userProfile.avatarUrl;

  let mobileNavAvatar = document.getElementById('mobile-nav-user-avatar');
  mobileNavAvatar.src = userProfile.avatarUrl;



  //  updating repositories 

  for (let i in repoList) {
    let ul = document.getElementById("repo-card-container");
    let li = document.createElement('li');
    li.classList.add('repository-card')
    li.innerHTML = (`
      <div class="repository-card-content">
                  <h4>${repoList[i].name}</h4>
                  <p>${repoList[i].description}</p>
                  <ul>
                    <li>
                      <span></span>
                    ${repoList.languages}
                    </li>
                    <li>${repoList[i].updatedAt}</li>
                  </ul>
                </div>
                 <aside>
                   <button>
                     <img src="./images/star.svg" alt="" />
                     <span>Star</span>
                   </button>
                 </aside>
      </div>
      `);

    ul.appendChild(li);
  };


  // updating total repo

  let span = document.getElementById('total-repo');
  span.innerHTML = userProfile.repositories.totalCount;


  // updating user  bio
  let section = document.getElementById('user-info');
  let div = document.createElement('div');
  div.innerHTML = (`
      <div class="bio-section-content">
      <div class="profile-avatar">
        <img src=${userProfile.avatarUrl} alt="avatar" id="profileAvatar"/>
      </div>
      <ul class="profile-name-list">
        <li>${userProfile.name}</li>
        <li>${userProfile.login}</li>
      </ul>
      </div>
      <div class="profile-details-container">
      <div class="edit-profile-container">
        <div class="update-status">
          <img src="./images/smile.svg" alt="avatar" />
          <span id="smiley">Set status</span>
        </div>
        <div class="edit-profile-btn">
          <button>Edit profile</button>
        </div>
      </div>
      <ul class="profile-followers-list">
        <li>
        <img src='./images/followers.svg' alt='avatar'/>
        <span>${userProfile.followers.totalCount}</span>
        followers
        </li>
        <li>
        <span>${userProfile.following.totalCount}</span>
        following
        </li>
        <li>
        <img src='./images/star.svg' alt='avatar'/>
        <span>${userProfile.starredRepositories.totalCount}</span>
        </li>
      </ul>
      <ul class='location'>
        <li>
          <img src='./images/placeholder.svg' alt='avatar'/>
          <span>${userProfile.location}.</span>
        </li>
        <li>
          <img src='./images/twitter.svg' alt='avatar'/>
          <span>@${userProfile.twitterUsername}.</span>
        </li>
      </ul>
      </div> 
      `);
  section.appendChild(div);


}
fetchedData();



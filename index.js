// Import stylesheets
import "./style.css"

// Body element
const body = document.getElementById('body')

// Button elements
const btnSend = document.getElementById("btnSend")
const btnClose = document.getElementById("btnClose")
const btnShare = document.getElementById("btnShare")
const btnLogIn = document.getElementById("btnLogIn")
const btnLogOut = document.getElementById("btnLogOut")
const btnScanCode = document.getElementById("btnScanCode")
const btnOpenWindow = document.getElementById("btnOpenWindow")

// Profile elements
const email = document.getElementById("email")
const userId = document.getElementById("userId")
const pictureUrl = document.getElementById("pictureUrl")
const displayName = document.getElementById("displayName")
const statusMessage = document.getElementById("statusMessage")

// QR element
const code = document.getElementById("code")
const friendShip = document.getElementById("friendShip")

async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: "1656132939-evpWYnj9" })  
  // Try a LIFF function
  switch (liff.getOS()) {
    case "android": body.style.backgroundColor = "#d1f5d3"; break
    case "ios": body.style.backgroundColor = "#eeeeee"; break
  }
  getUserProfile()
  if (!liff.isInClient()) {
    btnLogIn.style.display = "block"
    btnLogOut.style.display = "block"
    btnOpenWindow.style.display = "block"
  }
  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = "none"
      btnLogOut.style.display = "block"
      btnOpenWindow.style.display = "block"
      getUserProfile()
    } else {
      btnLogIn.style.display = "block"
      btnLogOut.style.display = "none"
      btnOpenWindow.style.display = "none"
    }
  } else {
    getUserProfile()
  }
}


main()
async function getUserProfile() {
  const profile = await liff.getProfile()
  pictureUrl.src = profile.pictureUrl
  userId.innerHTML = "<b>userId:</b> " + profile.userId
  statusMessage.innerHTML = "<b>statusMessage:</b> " + profile.statusMessage
  displayName.innerHTML = "<b>displayName:</b> " + profile.displayName
}
btnLogIn.onclick = () => {
  liff.login()
}

btnLogOut.onclick = () => {
  liff.logout()
  window.location.reload()
}

btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: window.location.href="/page2.html",
    external: true
  })
}
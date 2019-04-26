/**
 * This class just contains the entry point to register new views navigated to
 * It is global so modal can be added and keep the back button working on Android
 * The logic of transition is made in App.vue
 */
class Navigation {
  constructor() {
      this.navigated = []
  }
  push(obj) {
      //console.log("push")
      this.navigated.push(obj)
      this.trace()
  }
  pushModal($modal) {
      //console.log("pushModal")
      this.navigated.push({ "view": "__modal__", $modal: $modal })
      this.trace()
  }
  pop() {
      //console.log("pop")
      let poped = this.navigated.pop()
      /*if (poped.view === "__modal__") { // managed manually in popups
          poped.$modal.close() //ensure popup closes in all cases
      }*/
      this.trace()
      return poped
  }
  /**
   * Only pop if last is modal
   */
  popModal() {
      //console.log("popModal")
      let poped = this.navigated.pop()
      if (poped.view !== "__modal__") {
          this.navigated.push(poped)
      }
      this.trace()
  }
  canGoBack() {
      return this.navigated.length > 1
  }
  trace() {
      //console.log("Navigation length " + this.navigated.length + " [" + this.navigated.map(nav => nav.view).join(", ") + "]")
  }
}
export default new Navigation()
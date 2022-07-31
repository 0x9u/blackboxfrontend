# TODO:
- fix css global names and make them all camelcases (e.g. `font-size` -> `fontSize`)
- change id selectors to id attribute selectors (e.g. #id -> [id="id"])
- replace id with classes
- move userBox to loading module and make it a component
- rename loading.js to modal.js
- rework server menu 
- Add react redux for managing tokens if cookies are disabled
    - also use react redux for websockets since I may implement it into games
- convert this to typescript

**Ok so I discovered how to finally use websockets with the redux**
- use rxjs and redux observeable - done
- use rxjs websocket library and subscribe to it - done
- replace thunks with rxjs ajax calls - after i finish this chatapp
- fix modals - after prototype is done
    - made first animation faster
    - replace shitty transitions with one time animations moving up and down or some shit
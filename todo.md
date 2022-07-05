# TODO:
- fix css global names and make them all camelcases (e.g. `font-size` -> `fontSize`)
- change id selectors to id attribute selectors (e.g. #id -> [id="id"])
- move userBox to loading module and make it a component
- rename loading.js to modal.js
- rework server menu 
- Add react redux for managing tokens if cookies are disabled
    - also use react redux for websockets since I may implement it into games
- convert this to typescript

**Ok so I discovered how to finally use websockets with the redux**
- use rxjs and redux observeable
- use rxjs websocket library and subscribe to it
- replace thunks with rxjs ajax calls - after i finish this chatapp
# hatch code test

code test original url:https://github.com/Hatch-Team/tech-test-tiers

## how to set up 
 1. install dependency  
```npm install```
 2. run the local build  
```npm start```   
 3. if you want to build the file, run     
```npm run build```
4. run the unit test  
```npm run test```

## what I have done 
1. mimic the tree structure on a relational DB. in /src/mock/index file
2. set up the project, used a few library to speed up the coding
3. load division list from db, tranform into a json tree, and render it on page
4. add level filter on the top of the page, e,g, clicking '2' show all level 2 division and below
5. enable multiple Entity type
6. division is multi selectable, Entity List shows all the entity under the selected division/divisions.
7. "add Division" and "Add Entity" button added
8. Entity in the Entity List is clickable, clicking it bring up the slider screen shows the entity details and its hierachy 
9. unit test

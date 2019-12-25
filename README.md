# What is this?

- This is basic settings for agencies work with Veeva.
- Actually this is not targeted for every agency. I made this npm project only works for our company, so I think it going to not a good match for you.
- This will make your presentation and Slides and CSV file.

# Installation

```js
npm i -g npm
npm i -g create-veeva-project
```

This is only can use on global installation don't blame me.


### How to use

- Works similar like `create-react-app`
- Go to directory that you want to create in.
- Enter the name you want to use in project.

```js
create-veeva-project cholecap
```

# Questions
### Name of Veeva root Presentation :

This is for the name that <span style="color:red;">Veeva Presentation.</span> If you using Veeva, probably this is familiar to you.

### Total Number of Slide :

 Enter the total number of slide except PI and Ref Slide. 

### Total Number of Slide :

 Enter the total number of slide except PI and Ref Slide. 

### Name of Veeva Product :
 Enter the Veeva product name 

### Do you want to seperate Main and Add?

Do you want to separate Main and Add presentations? 
If you have experience work with GSK, they make separate Main and Add Presentations. 
Additionally, you know separate these two slides are sometimes more convenient.


### Initalize a git repository?
 Init a git repo or not


# After created the project
```js
npm start
```
npm start will execute `gulp watch` this will watch all root 'shared' folder and if change automatically copy and paste to sub presentation.

### Why shared folder is outside of project?
-> You can figured out 'shared' folder is outslide of project.<br>
-> So if you want to use properly, go to any files inside of shared folder and save.




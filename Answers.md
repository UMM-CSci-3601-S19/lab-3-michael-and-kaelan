:question: **1:** Notice anything new in our ``.gitignore``? There are actually
multiple ``.gitignore`` files in this project. Where are they?
Why might we have more than one, and how do they interact?
>There is one under server, under client, and the root directory. The root directory .gitignore affects the whole project, while the client and server .gitignore’s provide extra ignores to their respective folder and exceptions to the root directory. Something we noticed that we don’t remember from the previous project is that there are some non-ignores that ensure something is committed. One site of interaction between the different .gitignores is how the project .gitignore says to ignore all .jar’s, but the server one specifies that a certain .jar is kept, overriding the general .jar ignoring. 

:question: **2:** Note also that there are now multiple ``build.gradle`` files
as well! Why is this?
>The general project one has evaluationDependsOn for the client and server, and the gradle API makes it sound like those are declared so that the order of execution is different than default. The client one names a lot of tasks and gives them various parameters and groupings, while the server one aliases a task and mentions some dependencies. 

:question: ***3:*** How does the navigation menu (with Home and Users) work in this project? Compare `Server.java` and `app.routes.ts`. Both do a kind of routing; what does each accomplish and how?

>There isn’t anything to home other than a card. Users can be sorted by name and age. Users each have a dropdown with all of their information.
 The app.routes.ts specifies the url routing that the users would see. There is an empty path that defaults to home, and a users path to access the users page. The server Server.java routing sets up redirects and specifies routing for the server’s api.
 
:question: ***4:*** What does the `user-list.service.ts` do? Why is it not just done in
the `user-list.component.ts`?
>User-list.service.ts is dependent on user-list.component.ts. Component is a dependency that is injected into service. This allows a separation of the service/object in the dependency from what is calling it. 

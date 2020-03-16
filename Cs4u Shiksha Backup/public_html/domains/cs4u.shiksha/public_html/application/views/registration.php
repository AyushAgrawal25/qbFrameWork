Hello
<ul>
    
<pre>
{{feed}}
</pre>
    <li ng-repeat="post in feed">
        {{post.Post_Heading}} {{post.Post_Text}} {{post.UserName}}
        
        <br>
        Number of Views
        {{post.Count_Views}}
        <br>
        Number of Comments
        {{post.Count_Comments}}
        <ul>
            <li ng-repeat="comment in post.Comments">
                
                {{comment.UserName}}
                {{comment.Comment}}
                <ul>
                    <li ng-repeat="reply in comment.Replies">
                        {{reply.UserName}}
                        {{reply.Reply}}
                    </li>
                </ul>
            </li>
            Likes 
             {{post.Count_Captions}}
            <ul>
                <li ng-repeat="view in post.Views">
                 {{view.UserName}}
                </li>
            </ul>
            <ul>
                <li ng-repeat="url in post.Urls">
                 {{url.Url}}
                </li>
            </ul>
            {{post.Contents}}
            <ul>
                <li ng-repeat="content in post.Contents">
                 {{content.Image_Url}}
                </li>
            </ul>
        </ul>
    </li>
</ul>
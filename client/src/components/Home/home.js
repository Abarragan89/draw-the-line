import Auth from '../../utils/auth';
import './home.css'
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, GET_USER_POSTS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import Signup from '../Signup/signup';
import Login from '../Login/login';
import Nav from '../Nav/nav';

// import { AiOutlineDown } from 'react-icons/ai';
import { AiOutlineDown } from 'react-icons/ai';

function Home () {
    const { data } = useQuery(QUERY_ME_BASIC);
    console.log(data)
    const {data: postQuery } = useQuery(GET_USER_POSTS);
    // user information
    const username = data?.me.username || '';
    const userId = data?.me._id || '';
    // Post Info
    const postData = postQuery?.posts || [];
    console.log(postData)

    // check if user is logged in
    const loggedIn = Auth.loggedIn()
    return (
    <>
        {loggedIn ? 
        <>
        <Link to={`/profile/${userId}`}>View my profile</Link>
        <p>You're logged in, {username}!</p>

            {postData.map((post, index) => 
                (
                <section key={index}>
                    <h3>{post.postTitle}</h3>
                    <p>Ban Meter: </p>
                    <progress id="banMeter" value={post.banMeter} max="0.6">{post.banMeter}</progress>
                    <p>{post.createdAt}</p>
                    <p>{post.postText}</p>
                    <p>{post.username}</p>
                    <p>{post.likesLength}<a>  👍</a></p>
                    <p>{post.dislikesLength}<a>  👎</a></p>
                </section>
                ))}
        <button onClick={() => Auth.logout()}>Logout</button> 
        </>
        :
        <>
      <div className="logoDiv">
      <svg id="logo" width="569" height="58" viewBox="0 0 569 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-outside-1_26_4" maskUnits="userSpaceOnUse" x="0" y="0" width="569" height="58" fill="black">
<rect fill="white" width="569" height="58"/>
<path d="M7.75096 55.3278C5.90498 55.3278 4.48498 54.805 3.49099 53.7593C2.497 52.7137 2 51.2199 2 49.278V8.72199C2 6.78008 2.497 5.28631 3.49099 4.24067C4.48498 3.19502 5.90498 2.6722 7.75096 2.6722H21.5959C30.1632 2.6722 36.7661 4.96266 41.4047 9.54357C46.0907 14.0747 48.4337 20.5477 48.4337 28.9627C48.4337 33.195 47.8184 36.9544 46.5877 40.2407C45.4044 43.4772 43.6767 46.2158 41.4047 48.4564C39.1328 50.6971 36.3401 52.4149 33.0268 53.61C29.7135 54.7552 25.9032 55.3278 21.5959 55.3278H7.75096ZM13.0049 45.8423H20.9569C23.6549 45.8423 25.9978 45.4938 27.9858 44.7967C29.9738 44.0996 31.6305 43.0539 32.9558 41.6598C34.2811 40.2656 35.2751 38.5228 35.9378 36.4315C36.6004 34.2905 36.9318 31.8008 36.9318 28.9627C36.9318 23.2863 35.5828 19.0788 32.8848 16.3403C30.2342 13.5519 26.2582 12.1577 20.9569 12.1577H13.0049V45.8423Z"/>
<path d="M62.521 56C60.7224 56 59.3497 55.4772 58.403 54.4315C57.4564 53.3859 56.983 51.917 56.983 50.0249V8.57262C56.983 6.63071 57.4564 5.16183 58.403 4.16598C59.397 3.17013 60.7934 2.6722 62.592 2.6722H79.8449C85.4302 2.6722 89.7375 4.09129 92.7668 6.92946C95.7961 9.76764 97.3108 13.7261 97.3108 18.805C97.3108 22.0913 96.6245 24.9295 95.2518 27.3195C93.8791 29.7095 91.8912 31.5519 89.2878 32.8465C86.7319 34.1411 83.5842 34.7884 79.8449 34.7884L80.4129 33.5187H83.3239C85.3119 33.5187 87.0395 34.0415 88.5068 35.0871C90.0215 36.083 91.3232 37.6266 92.4118 39.7178L96.8138 48.3071C97.4765 49.5519 97.7841 50.7718 97.7368 51.9668C97.6895 53.1618 97.2635 54.1328 96.4588 54.8797C95.6541 55.6266 94.4708 56 92.9088 56C91.3468 56 90.0688 55.6515 89.0748 54.9544C88.1282 54.2573 87.2762 53.1867 86.5189 51.7427L79.7029 38.5228C78.9929 37.1286 78.1172 36.1826 77.0759 35.6846C76.0819 35.1867 74.8513 34.9378 73.3839 34.9378H67.988V50.0249C67.988 51.917 67.5146 53.3859 66.568 54.4315C65.6687 55.4772 64.3197 56 62.521 56ZM67.988 26.5726H77.8569C80.7916 26.5726 82.9925 25.9502 84.4599 24.7054C85.9745 23.4606 86.7319 21.5934 86.7319 19.1037C86.7319 16.6639 85.9745 14.8216 84.4599 13.5768C82.9925 12.332 80.7916 11.7095 77.8569 11.7095H67.988V26.5726Z"/>
<path d="M106.869 56C105.543 56 104.455 55.6763 103.603 55.029C102.798 54.3817 102.277 53.5104 102.041 52.4149C101.851 51.3195 102.064 50.0996 102.68 48.7552L120.855 6.85477C121.613 5.16183 122.512 3.94191 123.553 3.19502C124.595 2.39834 125.802 2 127.174 2C128.547 2 129.754 2.39834 130.795 3.19502C131.837 3.94191 132.712 5.16183 133.422 6.85477L151.74 48.7552C152.356 50.0996 152.569 51.3444 152.379 52.4896C152.237 53.5851 151.764 54.4564 150.959 55.1037C150.155 55.7012 149.113 56 147.835 56C146.226 56 144.972 55.6017 144.072 54.805C143.22 54.0083 142.463 52.7635 141.8 51.0705L137.54 40.6888L141.942 43.9004H112.336L116.737 40.6888L112.549 51.0705C111.839 52.8133 111.081 54.083 110.277 54.8797C109.519 55.6266 108.383 56 106.869 56ZM127.032 14.9959L117.944 37.7759L116.027 34.8631H138.25L136.333 37.7759L127.174 14.9959H127.032Z"/>
<path d="M173 56C171.485 56 170.254 55.6266 169.308 54.8797C168.361 54.083 167.604 52.888 167.036 51.2946L152.694 8.87137C152.078 6.97926 152.197 5.361 153.049 4.0166C153.948 2.6722 155.486 2 157.664 2C159.178 2 160.338 2.37345 161.143 3.12033C161.995 3.86722 162.681 5.03735 163.202 6.63071L174.917 43.3029H171.864L184.218 6.7054C184.786 5.11203 185.472 3.94191 186.277 3.19502C187.129 2.39834 188.241 2 189.614 2C190.939 2 192.004 2.39834 192.808 3.19502C193.613 3.94191 194.299 5.13693 194.867 6.78008L206.653 43.3029H204.026L215.954 6.63071C216.428 5.08714 217.09 3.94191 217.942 3.19502C218.794 2.39834 219.954 2 221.421 2C223.267 2 224.616 2.6722 225.468 4.0166C226.32 5.361 226.415 6.97926 225.752 8.87137L211.268 51.3693C210.748 52.9129 210.038 54.083 209.138 54.8797C208.239 55.6266 207.008 56 205.446 56C203.932 56 202.725 55.6266 201.825 54.8797C200.926 54.083 200.192 52.888 199.624 51.2946L188.407 17.9087H190.111L178.751 51.3693C178.183 52.9129 177.449 54.083 176.55 54.8797C175.698 55.6266 174.514 56 173 56Z"/>
<path d="M271.292 56C269.494 56 268.121 55.4772 267.174 54.4315C266.228 53.3859 265.754 51.917 265.754 50.0249V12.2324H253.187C251.72 12.2324 250.584 11.8091 249.78 10.9627C248.975 10.1162 248.573 8.94606 248.573 7.45228C248.573 5.90871 248.975 4.73859 249.78 3.94191C250.584 3.09544 251.72 2.6722 253.187 2.6722H289.326C290.794 2.6722 291.93 3.09544 292.734 3.94191C293.539 4.73859 293.941 5.90871 293.941 7.45228C293.941 8.94606 293.539 10.1162 292.734 10.9627C291.93 11.8091 290.794 12.2324 289.326 12.2324H276.759V50.0249C276.759 51.917 276.286 53.3859 275.339 54.4315C274.44 55.4772 273.091 56 271.292 56Z"/>
<path d="M304.225 56C302.426 56 301.053 55.4772 300.107 54.4315C299.16 53.3859 298.687 51.917 298.687 50.0249V7.97511C298.687 6.08299 299.16 4.61411 300.107 3.56847C301.053 2.52282 302.426 2 304.225 2C305.976 2 307.325 2.52282 308.272 3.56847C309.218 4.61411 309.692 6.08299 309.692 7.97511V23.8091H332.979V7.97511C332.979 6.08299 333.453 4.61411 334.399 3.56847C335.346 2.52282 336.695 2 338.446 2C340.245 2 341.618 2.52282 342.564 3.56847C343.511 4.61411 343.984 6.08299 343.984 7.97511V50.0249C343.984 51.917 343.511 53.3859 342.564 54.4315C341.618 55.4772 340.245 56 338.446 56C336.695 56 335.346 55.4772 334.399 54.4315C333.453 53.3859 332.979 51.917 332.979 50.0249V33.444H309.692V50.0249C309.692 51.917 309.218 53.3859 308.272 54.4315C307.372 55.4772 306.023 56 304.225 56Z"/>
<path d="M359.837 55.3278C357.991 55.3278 356.571 54.805 355.577 53.7593C354.583 52.7137 354.086 51.2199 354.086 49.278V8.72199C354.086 6.78008 354.583 5.28631 355.577 4.24067C356.571 3.19502 357.991 2.6722 359.837 2.6722H384.615C386.035 2.6722 387.1 3.07054 387.81 3.86722C388.568 4.61411 388.946 5.70954 388.946 7.15353C388.946 8.6473 388.568 9.79253 387.81 10.5892C387.1 11.3361 386.035 11.7095 384.615 11.7095H364.594V24.0332H382.982C384.45 24.0332 385.538 24.4315 386.248 25.2282C387.006 25.9751 387.384 27.0954 387.384 28.5892C387.384 30.083 387.006 31.2282 386.248 32.0249C385.538 32.7718 384.45 33.1452 382.982 33.1452H364.594V46.2905H384.615C386.035 46.2905 387.1 46.6888 387.81 47.4855C388.568 48.2324 388.946 49.3278 388.946 50.7718C388.946 52.2656 388.568 53.4108 387.81 54.2075C387.1 54.9544 386.035 55.3278 384.615 55.3278H359.837Z"/>
<path d="M422.513 55.3278C420.714 55.3278 419.318 54.805 418.324 53.7593C417.377 52.7137 416.904 51.2697 416.904 49.4274V8.42324C416.904 6.48133 417.377 5.01245 418.324 4.0166C419.27 3.02075 420.643 2.52282 422.442 2.52282C424.193 2.52282 425.542 3.02075 426.489 4.0166C427.435 5.01245 427.909 6.48133 427.909 8.42324V45.5436H446.936C448.451 45.5436 449.611 45.9668 450.415 46.8133C451.267 47.6598 451.693 48.8548 451.693 50.3983C451.693 51.9917 451.267 53.2116 450.415 54.0581C449.611 54.9046 448.451 55.3278 446.936 55.3278H422.513Z"/>
<path d="M463.141 56C461.343 56 459.97 55.4772 459.024 54.4315C458.077 53.3859 457.604 51.917 457.604 50.0249V7.97511C457.604 6.08299 458.077 4.61411 459.024 3.56847C459.97 2.52282 461.343 2 463.141 2C464.893 2 466.242 2.52282 467.188 3.56847C468.135 4.61411 468.608 6.08299 468.608 7.97511V50.0249C468.608 51.917 468.135 53.3859 467.188 54.4315C466.289 55.4772 464.94 56 463.141 56Z"/>
<path d="M483.793 56C482.137 56 480.859 55.527 479.96 54.5809C479.108 53.5851 478.681 52.1909 478.681 50.3983V7.82573C478.681 5.93361 479.108 4.48963 479.96 3.49378C480.859 2.49793 482.042 2 483.509 2C484.787 2 485.758 2.27386 486.42 2.82158C487.13 3.31951 487.935 4.16598 488.834 5.361L513.755 38.7469H511.838V7.52697C511.838 5.78424 512.264 4.43984 513.116 3.49378C514.016 2.49793 515.294 2 516.95 2C518.607 2 519.861 2.49793 520.713 3.49378C521.613 4.43984 522.062 5.78424 522.062 7.52697V50.6224C522.062 52.2656 521.66 53.5851 520.855 54.5809C520.051 55.527 518.962 56 517.589 56C516.264 56 515.199 55.7261 514.394 55.1784C513.637 54.6307 512.809 53.7593 511.909 52.5643L487.059 19.1784H488.905V50.3983C488.905 52.1909 488.479 53.5851 487.627 54.5809C486.775 55.527 485.497 56 483.793 56Z"/>
<path d="M537.89 55.3278C536.044 55.3278 534.624 54.805 533.63 53.7593C532.636 52.7137 532.139 51.2199 532.139 49.278V8.72199C532.139 6.78008 532.636 5.28631 533.63 4.24067C534.624 3.19502 536.044 2.6722 537.89 2.6722H562.669C564.089 2.6722 565.154 3.07054 565.864 3.86722C566.621 4.61411 567 5.70954 567 7.15353C567 8.6473 566.621 9.79253 565.864 10.5892C565.154 11.3361 564.089 11.7095 562.669 11.7095H542.647V24.0332H561.036C562.503 24.0332 563.592 24.4315 564.302 25.2282C565.059 25.9751 565.438 27.0954 565.438 28.5892C565.438 30.083 565.059 31.2282 564.302 32.0249C563.592 32.7718 562.503 33.1452 561.036 33.1452H542.647V46.2905H562.669C564.089 46.2905 565.154 46.6888 565.864 47.4855C566.621 48.2324 567 49.3278 567 50.7718C567 52.2656 566.621 53.4108 565.864 54.2075C565.154 54.9544 564.089 55.3278 562.669 55.3278H537.89Z"/>
</mask>
<path d="M7.75096 55.3278C5.90498 55.3278 4.48498 54.805 3.49099 53.7593C2.497 52.7137 2 51.2199 2 49.278V8.72199C2 6.78008 2.497 5.28631 3.49099 4.24067C4.48498 3.19502 5.90498 2.6722 7.75096 2.6722H21.5959C30.1632 2.6722 36.7661 4.96266 41.4047 9.54357C46.0907 14.0747 48.4337 20.5477 48.4337 28.9627C48.4337 33.195 47.8184 36.9544 46.5877 40.2407C45.4044 43.4772 43.6767 46.2158 41.4047 48.4564C39.1328 50.6971 36.3401 52.4149 33.0268 53.61C29.7135 54.7552 25.9032 55.3278 21.5959 55.3278H7.75096ZM13.0049 45.8423H20.9569C23.6549 45.8423 25.9978 45.4938 27.9858 44.7967C29.9738 44.0996 31.6305 43.0539 32.9558 41.6598C34.2811 40.2656 35.2751 38.5228 35.9378 36.4315C36.6004 34.2905 36.9318 31.8008 36.9318 28.9627C36.9318 23.2863 35.5828 19.0788 32.8848 16.3403C30.2342 13.5519 26.2582 12.1577 20.9569 12.1577H13.0049V45.8423Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M62.521 56C60.7224 56 59.3497 55.4772 58.403 54.4315C57.4564 53.3859 56.983 51.917 56.983 50.0249V8.57262C56.983 6.63071 57.4564 5.16183 58.403 4.16598C59.397 3.17013 60.7934 2.6722 62.592 2.6722H79.8449C85.4302 2.6722 89.7375 4.09129 92.7668 6.92946C95.7961 9.76764 97.3108 13.7261 97.3108 18.805C97.3108 22.0913 96.6245 24.9295 95.2518 27.3195C93.8791 29.7095 91.8912 31.5519 89.2878 32.8465C86.7319 34.1411 83.5842 34.7884 79.8449 34.7884L80.4129 33.5187H83.3239C85.3119 33.5187 87.0395 34.0415 88.5068 35.0871C90.0215 36.083 91.3232 37.6266 92.4118 39.7178L96.8138 48.3071C97.4765 49.5519 97.7841 50.7718 97.7368 51.9668C97.6895 53.1618 97.2635 54.1328 96.4588 54.8797C95.6541 55.6266 94.4708 56 92.9088 56C91.3468 56 90.0688 55.6515 89.0748 54.9544C88.1282 54.2573 87.2762 53.1867 86.5189 51.7427L79.7029 38.5228C78.9929 37.1286 78.1172 36.1826 77.0759 35.6846C76.0819 35.1867 74.8513 34.9378 73.3839 34.9378H67.988V50.0249C67.988 51.917 67.5146 53.3859 66.568 54.4315C65.6687 55.4772 64.3197 56 62.521 56ZM67.988 26.5726H77.8569C80.7916 26.5726 82.9925 25.9502 84.4599 24.7054C85.9745 23.4606 86.7319 21.5934 86.7319 19.1037C86.7319 16.6639 85.9745 14.8216 84.4599 13.5768C82.9925 12.332 80.7916 11.7095 77.8569 11.7095H67.988V26.5726Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M106.869 56C105.543 56 104.455 55.6763 103.603 55.029C102.798 54.3817 102.277 53.5104 102.041 52.4149C101.851 51.3195 102.064 50.0996 102.68 48.7552L120.855 6.85477C121.613 5.16183 122.512 3.94191 123.553 3.19502C124.595 2.39834 125.802 2 127.174 2C128.547 2 129.754 2.39834 130.795 3.19502C131.837 3.94191 132.712 5.16183 133.422 6.85477L151.74 48.7552C152.356 50.0996 152.569 51.3444 152.379 52.4896C152.237 53.5851 151.764 54.4564 150.959 55.1037C150.155 55.7012 149.113 56 147.835 56C146.226 56 144.972 55.6017 144.072 54.805C143.22 54.0083 142.463 52.7635 141.8 51.0705L137.54 40.6888L141.942 43.9004H112.336L116.737 40.6888L112.549 51.0705C111.839 52.8133 111.081 54.083 110.277 54.8797C109.519 55.6266 108.383 56 106.869 56ZM127.032 14.9959L117.944 37.7759L116.027 34.8631H138.25L136.333 37.7759L127.174 14.9959H127.032Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M173 56C171.485 56 170.254 55.6266 169.308 54.8797C168.361 54.083 167.604 52.888 167.036 51.2946L152.694 8.87137C152.078 6.97926 152.197 5.361 153.049 4.0166C153.948 2.6722 155.486 2 157.664 2C159.178 2 160.338 2.37345 161.143 3.12033C161.995 3.86722 162.681 5.03735 163.202 6.63071L174.917 43.3029H171.864L184.218 6.7054C184.786 5.11203 185.472 3.94191 186.277 3.19502C187.129 2.39834 188.241 2 189.614 2C190.939 2 192.004 2.39834 192.808 3.19502C193.613 3.94191 194.299 5.13693 194.867 6.78008L206.653 43.3029H204.026L215.954 6.63071C216.428 5.08714 217.09 3.94191 217.942 3.19502C218.794 2.39834 219.954 2 221.421 2C223.267 2 224.616 2.6722 225.468 4.0166C226.32 5.361 226.415 6.97926 225.752 8.87137L211.268 51.3693C210.748 52.9129 210.038 54.083 209.138 54.8797C208.239 55.6266 207.008 56 205.446 56C203.932 56 202.725 55.6266 201.825 54.8797C200.926 54.083 200.192 52.888 199.624 51.2946L188.407 17.9087H190.111L178.751 51.3693C178.183 52.9129 177.449 54.083 176.55 54.8797C175.698 55.6266 174.514 56 173 56Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M271.292 56C269.494 56 268.121 55.4772 267.174 54.4315C266.228 53.3859 265.754 51.917 265.754 50.0249V12.2324H253.187C251.72 12.2324 250.584 11.8091 249.78 10.9627C248.975 10.1162 248.573 8.94606 248.573 7.45228C248.573 5.90871 248.975 4.73859 249.78 3.94191C250.584 3.09544 251.72 2.6722 253.187 2.6722H289.326C290.794 2.6722 291.93 3.09544 292.734 3.94191C293.539 4.73859 293.941 5.90871 293.941 7.45228C293.941 8.94606 293.539 10.1162 292.734 10.9627C291.93 11.8091 290.794 12.2324 289.326 12.2324H276.759V50.0249C276.759 51.917 276.286 53.3859 275.339 54.4315C274.44 55.4772 273.091 56 271.292 56Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M304.225 56C302.426 56 301.053 55.4772 300.107 54.4315C299.16 53.3859 298.687 51.917 298.687 50.0249V7.97511C298.687 6.08299 299.16 4.61411 300.107 3.56847C301.053 2.52282 302.426 2 304.225 2C305.976 2 307.325 2.52282 308.272 3.56847C309.218 4.61411 309.692 6.08299 309.692 7.97511V23.8091H332.979V7.97511C332.979 6.08299 333.453 4.61411 334.399 3.56847C335.346 2.52282 336.695 2 338.446 2C340.245 2 341.618 2.52282 342.564 3.56847C343.511 4.61411 343.984 6.08299 343.984 7.97511V50.0249C343.984 51.917 343.511 53.3859 342.564 54.4315C341.618 55.4772 340.245 56 338.446 56C336.695 56 335.346 55.4772 334.399 54.4315C333.453 53.3859 332.979 51.917 332.979 50.0249V33.444H309.692V50.0249C309.692 51.917 309.218 53.3859 308.272 54.4315C307.372 55.4772 306.023 56 304.225 56Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M359.837 55.3278C357.991 55.3278 356.571 54.805 355.577 53.7593C354.583 52.7137 354.086 51.2199 354.086 49.278V8.72199C354.086 6.78008 354.583 5.28631 355.577 4.24067C356.571 3.19502 357.991 2.6722 359.837 2.6722H384.615C386.035 2.6722 387.1 3.07054 387.81 3.86722C388.568 4.61411 388.946 5.70954 388.946 7.15353C388.946 8.6473 388.568 9.79253 387.81 10.5892C387.1 11.3361 386.035 11.7095 384.615 11.7095H364.594V24.0332H382.982C384.45 24.0332 385.538 24.4315 386.248 25.2282C387.006 25.9751 387.384 27.0954 387.384 28.5892C387.384 30.083 387.006 31.2282 386.248 32.0249C385.538 32.7718 384.45 33.1452 382.982 33.1452H364.594V46.2905H384.615C386.035 46.2905 387.1 46.6888 387.81 47.4855C388.568 48.2324 388.946 49.3278 388.946 50.7718C388.946 52.2656 388.568 53.4108 387.81 54.2075C387.1 54.9544 386.035 55.3278 384.615 55.3278H359.837Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M422.513 55.3278C420.714 55.3278 419.318 54.805 418.324 53.7593C417.377 52.7137 416.904 51.2697 416.904 49.4274V8.42324C416.904 6.48133 417.377 5.01245 418.324 4.0166C419.27 3.02075 420.643 2.52282 422.442 2.52282C424.193 2.52282 425.542 3.02075 426.489 4.0166C427.435 5.01245 427.909 6.48133 427.909 8.42324V45.5436H446.936C448.451 45.5436 449.611 45.9668 450.415 46.8133C451.267 47.6598 451.693 48.8548 451.693 50.3983C451.693 51.9917 451.267 53.2116 450.415 54.0581C449.611 54.9046 448.451 55.3278 446.936 55.3278H422.513Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M463.141 56C461.343 56 459.97 55.4772 459.024 54.4315C458.077 53.3859 457.604 51.917 457.604 50.0249V7.97511C457.604 6.08299 458.077 4.61411 459.024 3.56847C459.97 2.52282 461.343 2 463.141 2C464.893 2 466.242 2.52282 467.188 3.56847C468.135 4.61411 468.608 6.08299 468.608 7.97511V50.0249C468.608 51.917 468.135 53.3859 467.188 54.4315C466.289 55.4772 464.94 56 463.141 56Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M483.793 56C482.137 56 480.859 55.527 479.96 54.5809C479.108 53.5851 478.681 52.1909 478.681 50.3983V7.82573C478.681 5.93361 479.108 4.48963 479.96 3.49378C480.859 2.49793 482.042 2 483.509 2C484.787 2 485.758 2.27386 486.42 2.82158C487.13 3.31951 487.935 4.16598 488.834 5.361L513.755 38.7469H511.838V7.52697C511.838 5.78424 512.264 4.43984 513.116 3.49378C514.016 2.49793 515.294 2 516.95 2C518.607 2 519.861 2.49793 520.713 3.49378C521.613 4.43984 522.062 5.78424 522.062 7.52697V50.6224C522.062 52.2656 521.66 53.5851 520.855 54.5809C520.051 55.527 518.962 56 517.589 56C516.264 56 515.199 55.7261 514.394 55.1784C513.637 54.6307 512.809 53.7593 511.909 52.5643L487.059 19.1784H488.905V50.3983C488.905 52.1909 488.479 53.5851 487.627 54.5809C486.775 55.527 485.497 56 483.793 56Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
<path d="M537.89 55.3278C536.044 55.3278 534.624 54.805 533.63 53.7593C532.636 52.7137 532.139 51.2199 532.139 49.278V8.72199C532.139 6.78008 532.636 5.28631 533.63 4.24067C534.624 3.19502 536.044 2.6722 537.89 2.6722H562.669C564.089 2.6722 565.154 3.07054 565.864 3.86722C566.621 4.61411 567 5.70954 567 7.15353C567 8.6473 566.621 9.79253 565.864 10.5892C565.154 11.3361 564.089 11.7095 562.669 11.7095H542.647V24.0332H561.036C562.503 24.0332 563.592 24.4315 564.302 25.2282C565.059 25.9751 565.438 27.0954 565.438 28.5892C565.438 30.083 565.059 31.2282 564.302 32.0249C563.592 32.7718 562.503 33.1452 561.036 33.1452H542.647V46.2905H562.669C564.089 46.2905 565.154 46.6888 565.864 47.4855C566.621 48.2324 567 49.3278 567 50.7718C567 52.2656 566.621 53.4108 565.864 54.2075C565.154 54.9544 564.089 55.3278 562.669 55.3278H537.89Z" stroke="white" strokeWidth="4" mask="url(#path-1-outside-1_26_4)"/>
</svg>
      </div>  
          <main className="aboutSection">
            <h1 className="debateText">Let's debate</h1>
            <p className="about">Draw the Line is a debate platform monitored and regulated by our community.
            We strive to bring forth a safe space for our community members to engage in thought provoking debates with one another.
            </p>
            <AiOutlineDown className="downArrow" size={25}/>
          </main>
          <div className="loginContainer">
            <Login/>
          </div>
        </>
          
        
    }
    </>
    )
}

export default Home;

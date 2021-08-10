
Product service start ampqlib []

User sends a list of product IDs to buy

Create an order with the products with a total value of sum of product prices

[links](https://www.rentallscript.com/airbnb-clone/)_

[and](https://www.simform.com/how-make-app-like-airbnb/#feat)_

[codementor](https://www.codementor.io/posts/new)

Firebase or Cloud??-->Firebase providing authorization and file storage

[codes](https://github.com/yons101/hotel101-hotel-bookings-laravel-react)

[??](https://js.devexpress.com/Demos/DXHotels/#home) _

[ui](https://www.telerik.com/kendo-react-ui/)_

[The System To Manage?](https://dhtmlx.com/docs/products/dhtmlxHotelManagement/)

```js
const fs = require('fs');
const {google} = require('googleapis');
const reqValidator = require('../../Utility/requirement-validator.js');
const appUtil = require('../../Utility/appUtil.js');

const TIMESLOTS_PATH = './Utility/timeslots.json';
/**
 * Searches using the provided date for a timeslot matching the hour and minute specified.
 * @param {object} timeslots  Object containing info on each timeslot for the day.
 * @param {number} year  Year of the timeslot to search for.
 * @param {number} month  Month of the timeslot to search for.
 * @param {number} day  Day of the timeslot to search for.
 * @param {number} hour  Hour of the timeslot to search for.
 * @param {number} minute  Minute of the timeslot to search for.
 * @returns {object}  The timeslot object that was found. If nothing was found, returns undefined.
 */
function findMatchingTimeslot(timeslots, year, month, day, hour, minute) {
    const timeslotDate = new Date(Date.UTC(year, month-1, day, hour, minute)).toISOString();
    const foundTimeslot = timeslots.find(function (element) {
        //const elementDate = new Date(element.startTime).toISOString(); // Ensure matching ISO format.
        return element.startTime.includes(hour + ':' + minute  + ':00');
    });
    if (!foundTimeslot) return false;
    return {time: foundTimeslot, date: timeslotDate};
}

/**
 * Books an appointment using the given date and time information.
 * @param {object} auth  The oAuth2Client used for authentication for the Google Calendar API.
 * @param {number} year  Year of the timeslot to book.
 * @param {number} month  Month of the timeslot to book.
 * @param {number} day  Day of the timeslot to book.
 * @param {number} hour  Hour of the timeslot to book.
 * @param {number} minute  Minute of the timeslot to book.
 * @returns {promise}  A promise representing the eventual completion of the bookAppointment() function.
 */
function bookAppointment(auth, year, month, day, hour, minute) {
    return new Promise(function(resolve, reject) {
        const isInvalid = reqValidator.validateBooking(year, month, day, hour, minute);
        if (isInvalid) return reject(isInvalid);

        const timeslots = (JSON.parse(fs.readFileSync(TIMESLOTS_PATH))).timeslots;
        const timeslot = findMatchingTimeslot(timeslots, year, month, day, hour, minute);
        if (!timeslot) return resolve({success: false, message: 'Invalid time slot'});
        const date = year + '-' + month + '-' + day;
        const event = appUtil.makeEventResource(date, timeslot.time.startTime, timeslot.time.endTime);

        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event
        }, function (err, res) {
            if (err) return console.log('Error contacting the Calendar service: ' + err);
            const event = res.data;
            console.log('Appointment created: ', event.id);
            const result = {startTime: event.start.dateTime, endTime: event.end.dateTime};
            const response = Object.assign({success: true}, result);
            return resolve(response);
        });
    });
}

module.exports = {
    bookAppointment
};
```
[more](https://github.com/dfwteinos/Airbnb)_


[haha](https://github.com/daltonmenezes/aircnc)

## consider
[eg](https://opensourcelibs.com/lib/airbnbapi)_

[eg2](https://dev.to/plazarev/7-promising-hotel-management-booking-apps-built-with-javascript-3h38)_

[boilerplate](https://opensourcelibs.com/lib/react-airbnb-boilerplate)_

How can you create a website like Airbnb?
Before creating your website, you need to know the features that should be available and the tech stack that can be used.

Some necessary features of Airbnb like website are,

Seasonal Pricing Calendar
iCal integration
Safer payment gateway - Stripe integration
Multiple booking options
Multi-language and multi-currency


**_This is a dummy description of what would be a complete app_**

### Intro
A host lists his/her property details along with pricing, rules, facilities available etc
A user that is looking for a vacation rental searches for a place on the app. 
They typically set destination, a search radius, price range and other preferences
Upon finding a perfect place to rent, a user then makes a booking request
The host receives a booking request and then decides whether to approve or not

If a host approves a request, an amount gets deducted from user’s bank via a payment gateway
After the stay, the payment automatically gets paid to the host
User and host both review each other


There are more users that will use “search” than users that will make a booking. 
You will have to make sure that the search is performant, but at the same time, you will have to ensure that the 
failure of search services doesn’t take down your app’s booking functionality. Booking is a core feature, and if 
I were to prioritize, I would prioritize this above everything else.
Chat is a two-way freeway. We usually talk about creating an API (helps your app communicate with cloud application and database), 
but in this case, an API won’t be able to handle chat, search and booking altogether. Keep a note that chat is real-time, single 
threaded(jargon!) and a high resource hungry operation. There is a need to create a separate queue service that times messages 
and communication with chat services.
Third party services like payment gateways, verification services, customer support, etc go down all the time. 
Sadly, 90% uptime is not sufficient! But this has a domino effect. For example, in poorly written apps, such failures 
tend to take the entire system down. For example, if your chat service provider is down, there’s no reason for your 
listing search to not work. To me, that’s a poorly thought out technology piece.
What if a host is adding his/her property details to the app just tapped “submit” button and loses internet 
connection at the same time? Well, the hours that he/she had put behind adding images, description, title, details, etc are 
now gone. Mobile forms aren’t easy, web forms could be friendly, but then again do consider the attention time. 
Your app just asked someone to spend 20 minutes filling in some information that now suddenly is nowhere. 
Chances are that you are going to lose the user


## Services
1. Search services
2. Booking services
3. Payment services
4. Offline-online synchronization services
5. 3rd party services
6. Chat services

# Booking services______________
The booking related information is stored in a MySQL database that brings reliable data storage to the Booking related events. 
Any disruption in a database server would mean that a user that just booked a property wouldn’t be able to get 
the status of his booking, chances are that the booking never happened either.

# Search and chat services________
You will read on how to implement effective search later in the sections that follow, but I would 
emphasize the difference in usage of Search vs other services. Your app’s users would probably use chat 
and search a lot more than most other functionalities.
As you can see in the diagram below, I have separated search and chat services. Search services are accessed 
using API services, whereas, for chat service, I suggest using a queue service like RabbitMQ or any 3rd party 
services.

# 5: We aren’t still dealing with offline-online synchronization effectively. 
One fatal flaw in the entire architecture 
is the lack of offline support. To handle this effectively on mobile, we can use either Firebase, Realm or Couchbase to 
store data locally till user’s mobile is in-network again. Similarly, for the web app, you can build simpler services to 
handle offline storage.


# User verification -- 
for spam free secure app(to create and maintain a trusted environment)
When users sign up as a Host to list their property, you need to verify their online identity and physical identity. 
system collects identity verification information such as images of government-issued ID, passport, 
national ID card, or driving license, as permitted by applicable laws.

For identity verification, you need to ask users to upload their images of government Id and selfie or scanned headshot. 
Further, you need to match user’s image with document image to check that both are same. This process requires machine 
learning technology to validate a user’s identity document with a facial image.

For a majority of the on-demand apps, I see the need to enforce identity verification at the very early stages. The reason is pretty simple, renting out your expensive real estate to someone you just met over the internet is dangerous.

Now, the good part is that it won’t cost you a lot to do that!

You can simply use providers like Jumio, Shufti Pro, Onfido, etc to enable automatic identity verification within your app.


### App search  Search by 

- Destination
- Property type
- Price range
- Availability
- Housing capacity
- And many more…
Use ElasticSearch or MeiliSearch

### Booking features
Comparison of different listings
Trip cancellation
In-app calendar
Payment integration and management
Geolocation
AR and VR driven experiences
Application security
Chat functionality
SEO optimized single page apps


### Random shit from https://www.simform.com/how-make-app-like-airbnb/#feat

When a host signup in your app and activate his listing, the guest should be able to book his property for renting purpose. This requires a booking feature to be implemented in your app.

Consider Instant Booking
“Do you know that more than 50% of Airbnb hosts have switched to Instant booking as opposed to the normal booking feature”
This was back in 2016

Airbnb introduced instant booking in late 2017 and saw a rapid adoption of Instant booking as it became the preferred way for hosts to rent out their properties.

How does it work?
Under normal booking functionality, the host has to approve any booking request that has been made for his/her property. Often they don’t approve or disapprove soon, which either leads to a cancellation or a poor experience.

With identity verification services in place, you can allow your hosts to reliably list their properties for an instant booking option, and a user can book them instantly!

This is one of the main reasons why I think a proper MVP feature design is extremely crucial for your app. You have to think about how one feature could complement another, how network effects and system design would compliment your user experience.

The result at the end could be very effective and simple at the same time.

If you need an inspiration for this, this is one of the Airbnb’s killer feature and if you are interested you can read through the section below to understand a simple math behind their Instant booking filter.

2 out of 3 booking on Airbnb happens with Instant Booking

The math behind Airbnb’s Instant booking features
Airbnb dynamically determines whether to show instant booking to someone or not. At the same time, they wish to maximize the number of bookings being made.

For every search on Airbnb, they create two ranking scores:

Search Score associated with each search
A request to book score
On top of these two, there are two additional factors:

Seasonality
And the platform on which the user is using their app
The entire goal of Airbnb is to increase Instant books without reducing the booking score. In the end, we end up with an equation like this at the core of our minimization process to maximize instant booking:

Airbnb search score
When the search score finds a user search eligible to be a part of the instant booking, Airbnb automatically turns on the Instant search filter and alert the users with a tooltip.

Proposed Solution: I feel that the Instant book feature can be tweaked in at least 10 different ways. For example, you can simply add a countdown timer to trigger instant purchase intents. I suggested that out-of-context, but you should always consider your use case before jumping to conclusions.

Processing Payment through your app
If you want to integrate a payment functionality in your app, then there are many payment gateways that might be helpful for you.

Should you be worried about the payment compliance(PCI)?

With these payment gateways providers in place, you don’t need to worry about 99% of the payment related security issues. All you have to do is to make sure that you follow all best practices suggested by the payment gateway provider.

At the end of the Payment gateway integration process, you will be prompted by your provider to fill in a PCI SAQ_AEP form. This form is a declaration that you followed all best practices to secure your customers. That’s it!

Stripe – Once in place, Stripe processes the payment through its own servers – so you don’t have to store sensitive data or worry about being PCI compliant – takes a small percentage and checks for fraud. Stripe accepts all major debit and credit cards from more than 135 currencies. It charges a fixed $.30 fee + 2.9% of every transaction that is made on a card or digital wallet.

Braintree – Braintree also accepts all major debit and credit cards from more than 130 currencies. Similar to Stripe, Braintree also charges 2.9% + $0.3 per transaction that is made on a card or digital wallet. Braintree also provides a split payment functionality which is an absolute necessity when a group of people are using the same service ex: sharing a rental space in the case of Airbnb

If you are thinking about building your Airbnb type app in React native, I should pre-warn you about the fact that there are very few payment gateway providers that are actually providing an SDK for React Native. You are most likely to end up creating a wrapper around native apps to integrate them with your app. This is painful to manage and it is even painful to keep your wrappers updated with each and every release.

Make it easy for user to learn more about the place they are going to rent
Do you know that “Majority of renting decisions made by users in Airbnb is greatly influenced by the kind of comfort and facilities provided at the host’s place”?

These minute details on the rental property and available facilities are often what makes someone feel at home, get a taste of the local culture or inform them how luxurious the vacation would be.

Compare different rental properties
An app like Airbnb does have a feature of saving the favorite houses to a list. Even with this feature in place:

A user had to look through the different houses individually
Memorize them to compare and then take a decision. Information overload adds unnecessary complexity to your app’s user experience
Proposed Solution: In order to solve this problem, an app like Airbnb shall consist of a comparison feature. I recommend having a comparison feature on top of the existing favorites list. When the user views their list, all the houses within that list would be selected by default. The user would be able to select or deselect their desired houses, then click on the Compare button to generate a list showing a side-by-side comparison of various properties. [See below Image for reference]

Compare feature in Anirbnb like App
Trip Cancellation at the last minute
Building a successful app requires you to think like a user. In some vacation rental apps (even Airbnb), the host can cancel the booking at the 11th hour. If you have been in this situation before, you would find yourself swore never to use this app.

Last Minute Cancellation
But, your app can do better. You can reduce last-minute cancellations by simply:

Adding a cancellation fee: For every last minute cancellation by the host, the host will incur a cancellation fee.
Add # of cancellations to the profile of host: This will not only just improve the trustworthiness of a legit host but would also force them to only cancel a booking when they absolutely have no other options
Block calendar dates for last minute cancellations: Another way in which on-demand rental apps have been dealing with last minute cancellations is by blocking the calendar dates for which last-minute cancellations happened. By doing so, the host won’t be able to leverage surge pricing at the last moment and will be blocked from accepting any request on those dates.
Dealing with last minute cancellations is a bit tricky, you can look into what works best for your audience. Another alternative to the three approach would be to provide a rental place nearby as an alternative when a host cancels out of the blue.

Your app’s calendar is a killer feature, but you don’t know it yet!
If you are managing a business, you would already know, managing your calendar is extremely important. For an app like Airbnb, it is quite common for hosts to accept a booking request only to later learn that the dates won’t work for the host.

We have already established that last minute cancellations are a huge deal for a two-sided marketplace like Airbnb. Here, the host is making a cancellation because he/she wasn’t managing a calendar.

This is where an optimized user experience for a two-sided marketplace comes into the picture.

Airbnb Contextual Calendar feature
Why is a contextual calendar so important here?
So, for this let’s dig into consumer sciences a bit. The probability that a host would check his calendar after t days (an assumption that he checked his calendar t days ago) follows a graph like this:

Days between two calendar check
This graph was generated from data of real users.

A simple deduction of this graph would imply that as the time “t” increases, chances that a host would check his calendar for a booking would decrease exponentially.

Now, we can define something called a calendar to action ratio, this is:

Days between two calendar checks / Average number of days between two calendar checks

Guess what?

From the same data, we can easily see that there is a high correlation between calendar checks and last minute cancellations.

Look at the graph below:

Decline and cancellation rate
Quite simple and easy to understand that your app should do something about decreasing this calendar to action ratio with a threshold. For example, if you find that the ratio is greater than 2, let’s send them a contextual email reminder on updating their calendar.

Note that you should do your research properly before setting up this calendar to action ratio. If it is set too low and a host ends up getting too many emails, this would result in a lost app user as well.

The way I would approach this problem without investing thousands of dollars into research is simply by looking at how users typically manage their calendars and on what dates do they prefer to do so. From the same data, we can easily see that the probability of checking out calendar is extremely high on Sunday, Thursday, Friday, and Saturday.

Note: This data is based on the US, France, Germany and Canada based users.

Calendar View Probability
So, now you know when to email them.

Dealing with Payment scam and Fake Listings
Scams are rare but they are often inevitable in peer to peer marketplaces such as Airbnb.

If I were to build a list of scams that can happen in an app like Airbnb, I would add the following to my list:

Duplicate listings with different addresses
Fake listing photos and/or address
Fake reviews by friends or family of host
An illegal listing that causes problems for guests
Host demanding extra cash
Host blackmailing guests
Host falsifies damages
Demands offsite payment
Fake scam emails
Host blackmails guest for a good review
Fake reviews by friends or family of host
These kinds of scams can be prevented by:

Dealing fake listings with Machine Learning technology – Machine learning algorithms can be used to detect fake listings before they ever go live on platform. The technology can actually evaluate fake listings on the basis of several of hundreds of risk signals such as host reputation, template messaging, duplicate photos and other discrepancies. When a listing is predicted as fake by these algorithms, it can be blocked immediately before appearing on the app.
Safeguarding the payment functionality to prevent frauds – Payment from the payment gateways can be released just after a guest checked-in to the host apartment. This will give both parties (hosts and guests) enough time to evaluate that everything is according to their expectation.
Flagging feature to tackle fake or duplicate listings – App can have a feature by which user can report or flag any suspicious or fake listing. These flags can be fed directly into risk model to re-evaluate whether a listing should be automatically removed or manually reviewed.
Educating the hosts and guests through messages – Guests and hosts can be reminded by the messages to stay alert and never pay anyone outside the app. A simple Twilio integration would help your app to communicate via SMS notifications.

Geolocation Map
A Geolocation Map like Airbnb reloads the data and shows all available apartments on the map with prices. Attached below is the image which will make you better understand the Map like Airbnb:

Airbnb-Android Map
When the map gets executed, it fetches all available apartments on changing the location of the map by dragging, dropping or zooming which are on a map from the back-end. Furthermore, upon clicking on the marker, it displays the basic information about the apartment.

To put succinctly in technical terms, an Airbnb kind of Map listing must process a user’s coordinates, search locations, gather information such as price and property type etc. and shows the relevant listings in a Map.

So, how can you implement a map functionality in an app like Airbnb?

Airbnb used Mapbox Studio for designing maps with OpenStreetMap data and hosted them via Mapbox. If you wish to implement Maps in your app in the same way that Airbnb did then you can use MapBox SDK in your app.

However, if you wish to rely on Google Map services, then you can use following services for implementing a Map like Airbnb:

Google Autocomplete services: Google provides the Place Autocomplete services with their Google Map SDK. As the name suggests, it allows a user to write partial names and get instant results of the location, zones, zip, etc. This makes it pretty easy for a user to seamlessly search across their favorite destinations. If this is your first time working on an app like Airbnb, you are going to surprise by how difficult users find it to type in names of certain cities(especially that aren’t in US).
Google Matrix API: Along with Google Autocomplete, the SDK also provides Google Matrix API which calculates the approximate travel time and distance (including traffic density) from user’s current location to their destination, it even suggests what transport is available.
Now, all you have to do is to add Google or Mapbox’s SDK and APIs to your mobile and web applications. That’s it, you would have a really high performing map functionality within your application.

You can customize these maps on your mobile apps or web app for a look and feel as well. Look at some of these customization options below, feel free to imagine how your maps should look to an end user.

If you want more inspiration, find three more custom styles below:

Pricing: Google Maps API vs MapBox
The Google Maps API offers 25,00 map loads per day free of cost. Beyond that, $0.50 will be charged per 1.000 additional requests up to 100,000 requests per API. However, If you have larger requirements, then you need to contact Google Maps team for a license.

However, Mapbox offers 50,000 views/month, for $50 with 3 custom styles.

Cost is not always everything. You should always weight pros, and cons before making any decision.

A better sense of Judgement for Guests in the form of AR-VR
Almost each and every vacation rental startup that is past series B round is actively trying to leverage AR and VR to improve the user experience. Here Airbnb announced that they are experimenting with augmented and virtual reality technologies to enhance customer travel experiences.

Using AR and VR, you can:

Showcase rental properties better to app’s user
Show what other facilities are available with micro details
Give your users an experience of what it would be like to live there before they even step in
Such an AR concept from Airbnb shown below (things are closer to the reality that you imagine!)

airbnb_ar_map_concept
Technologies like AR/VR aren’t just to showcase property. But they also solve a lot of real-life challenges that come with purely digital technologies like mobile apps.

For example, if I had to leave operating instructions on my very special oven that only works after tapping it twice, it could give my guests a lot of frustration, right? Even better, what if you could add pictorial notes (imagine street signs for your home usage). I mean, you could give the complete end to end instructions on minutest detail possible. For example, I can simply label something as kid-friendly or not.

AR-VR Experience
AR or VR aren’t just another evolving technology, it is now a tool for disruption for startups that care enough to do so. If this technology stack fits well with your audience, do consider adding it right from the MVP.

To get custom made AR and VR capabilities, you have the following technologies at your disposal:
ARCore from Google, ARKit for Apple
Google VR from Google, Apple’s VR is still in progress
There are some other providers as well (some are paid, some are open source and free):

VIRO
Augment
Argon
Babylon.js (for web)
Improving Application Security for an App like Airbnb
Implementing security measures isn’t cost effective for startups. But, that’s no reason for you to not do anything. I don’t want to sound cliche here, but Facebook is just an eye opener for everyone. Those of us that have been working in technology space have been anticipating something like this from a really long time.

Getting back to implementing application security for an app like Airbnb, you can make a huge difference by simple security measures to make sure that your users remain secure.

A few that comes to the top of my mind are :

Third party API access and control: Restrict third-party apps and providers and put a control that prevents a level of access that no user would consent. Facebook failed to do this and the consequences were really bad.
Secure data: Encrypting data while storing it locally, while on a network and while storing it on your servers. I have detailed encryption on a local database in the section that follows. Apart from manually implementing your local database, I would suggest you to look into local database providers like Realm, Couchbase, Firebase local storage, etc to leverage industry grade and compliant encryption locally. Not to mention that they are pretty easy to implement and have been tested by millions of users. It often gets difficult to match this level of secure encryption for startups trying to hack their way out of a garage.
Make your app tamper proof: Adding simpler tamper-proof mechanisms that prevent anyone from reverse engineering your app and gaining unauthorized access
Use Authorization and Authentication: Make sure that any API that your mobile or web app relies on utilizes a secure authentication. OAuth 2 is pretty much what most startups use to bring in secure authentication for the apps, but you might consider other solutions like Auth0 as well. They all have their pros and cons. There are some providers like OpenID Connect that allows users to log in once after which they don’t need sign in again in the mobile app.
That’s all you need to do to make authentication strong.

Now, let’s talk about Authorization.

For startups that have a well-defined use case, I would recommend looking in Secure sign-on (or SSO) to manage and authorize their users. Think of it as your own custom authorization API that helps you manage and authorize all of your users, directly from your own servers. After working with so many startups, I now understand that a lot of startup entrepreneurs find it pretty difficult to get this right. If you are finding it difficult as well, shoot me a message, I would be happy to clarify!

When you sign in on your online account for e.g. Banking site, a lot is going on behind the scenes. The system compares your credentials with all the data on file in the authentication database until it finds a match. When a match is found, the information and permissions linked to your account are sent back to the website granting you access to your account.

Nowadays, many systems work in a decentralized manner. When you need to login for different service with same credentials it won’t work and you need to use a different set of credentials. The obvious solution to this problem is to share session information across different domains and SSO does it very well.

SSO authentication creates a centralized login system. To put it simply, SSO authentication allows users to sign in once to access accounts, services, or products on multiple domains.

Be the security guy for your startup
Pay attention to what your development team is doing. Don’t let them use hardcode server and third-party credentials in your code. If they hardcode these credentials, any attacker that reverse engineers your app would gain an access to your servers or third party services as well.

In-app chat functionality between Hosts and Guests
Whenever a guest books a house with an app like Airbnb, he would like to message the host either to say an informal ‘hi’ or to converse something important about his trip. Or a host may want to converse with his guest to know more details about him. This requires a real-time in-app messaging feature so that both guests and hosts can converse and chat with each other.

So, how can you implement a real-time chat environment in your app?

Well, to build a real-time in-app chat feature in an app like Airbnb, you can use

Socket Programming
Backend as a Service
Third party SDKs or APIs such as Layer and Twilio
Using Socket programming to implement Chat
You could use Websockets to build your own chat server but that will require expert developers provision and tons of effort and time to implement with scratch. Hence, it is not advisable to build a chat feature with scratch when you are building an MVP at the initial stage.

Alternatively, I would recommend you to check out Firebase backend as a service and Openfire server which supports XMPP protocols
Building a chat functionality by using backend as a service

A mobile Backend as a service such as Firebase offers you access to a hosted real-time server infrastructure and a mobile SDK which makes it easy to integrate its services into your app.

Firebase provides you with some awesome services that are essential for developing a real-time chat functionality such as:

Automatically scaling of your app
First-class security features
Offline synchronization
However, Firebase is definitely not free considering the services it provides are not easy to implement with the scratch.

Firebase offers you free usage upto 100 concurrent users upto 1GB. However, it is charged for $25 per month if your user base exceeds that limit (say upto 10k).

You can definitely opt for Firebase if budget is not a constraint for you.

Implementing a chat functionality on Openfire server
Building a chat functionality using Openfire server is reliable when you are building an MVP as it is free and Open Source. However, at the end of the day, it is you who has to take care of extra efforts for the sake of high speed and scalability. If you are bounded by budget constraints in the initial stages of an MVP then you can always stick to Openfire server.

Implementing a chat functionality using third party SDKs
Third-party products such as Layer, and Applozic offer their SDKs that you can seamlessly integrate with your app for implementing real-time chat feature in your app. Using these SDKs will drastically reduce tons of efforts that are required to build a real-time chat functionality in an app.

Recommended Read: How to Make a Messaging App like Whatsapp, Telegram, Slack

Make an SEO friendly Web app (be it Single page or not)
Do you know that a Single Page Web Application(SPA) when built using Javascript can cause you some critical SEO problems for your business?

Yes, you read that right!

Javascript languages such as Angularjs, ember.js, and backbone.js could cause some critical issues for web app such as:

SPA apps are difficult for SEO
SPA deep links are hard to get indexed
In fact, it may so happen that you could lose thousands of potential users that might give you an edge over your competitors.

Isn’t it a big damage to your business?

So, even if you have to rely on Javascript for building your web application, how can you deal with this SEO issue?

Well, Airbnb dealt with it by building their web app with Isomorphic Javascript.

A typical Isomorphic Javascript app for web look like this:

Isomorphic Javascript
Here, application logic and view logic of an app can be executed on both the server and the client. This is good for both SEO and performance.

But,

As an MVP, you don’t have to adopt the same path that Airbnb did. Do you?

So, how as an MVP will you tackle this problem of SEO?

If you want to develop your web app with Angular then you can use Universal Angular which renders the HTML in server side and sends it back to the browser.

Whereas if you are using React to make your web app then you need not to worry as React is itself isomorphic i.e it renders your app’s application logic and view logic in server side.

Marketing and Growth Hacking
Marketing & Growth Hacking1
Drip emails
Drip campaigns are a vital part of building a rent-sharing marketplace. As a marketplace never remains stagnant, it grows and requires the customers and users to grow with it.

Drip email marketing software makes it very easy to schedule drip email campaigns.

Depending on your target audience, you can push re-engagement emails, email about new updates and features within the application, keep them training with growth hacks/good practices concerning your marketplace and share customer stories to keep them motivated.

App Analytics Reports and Campaigns
There is no need to mention how important app analytics is for your startup’s growth. Especially, when your app is in an MVP phase, you would definitely want to see how it is performing up to the expectations of your users.

An app analytics tool for an app like Airbnb is important as you can run multiple performance marketing campaigns for your app. Moreover, you can easily monitor and compare the efficiency of every traffic source (ad networks for publishers) based on your predefined KPIs with the help of an analytics tool.

Say, in an app like Airbnb, you are running a user acquisition campaign, what you can do is keep checking the number of installs and registrations coming from every traffic source. Based on such attribution data, you can narrow down the sources that deliver the best results and allocate its market spends accordingly.

Analytics tools such as Mixpanel will let you see how often customers come back after few months or how many users return 3 or 5 times a day.

Mixpanel comes at a price of $100 per month.

Apart from Mixpanel, you can use following tools for measuring your app analytics:

Google Analytics for Mobiles
Apsalar
Flurry
Localytics
Distimo
AppsFlyer
Crash Reporting
Crash reporting tools such as Crashlytics and NewRelic will show you detailed insights when your app crashes and what’s the reason behind the crashing.

Optimizely for A/B Testing
Optimizely, one of the most well-known companies in the industry, offers solutions for mobile web and mobile apps. You can A/B test any feature and make immediate changes with no need for app store approval. Furthermore, Optimizely also let you experiment with onboarding, feature discovery, and re-engagement strategies. In case you are unsure about any new feature, you can do phased rollouts and then quickly iterate any kind of change. You can also deliver personalized experiences to all your users with their advanced targeting.

User segmentation
Finding new users is vital for an app to succeed. Let’s assume that you have already achieved that. Next step will be to find similar users and group them so that you can structure them and better understand their efforts.

Services such as Braze and Leanplum and Apsalar allow you to segment your users on the basis of user behavior. The segmentation for users will change automatically when the user behavior changes. One of the major benefits of using these SDKs for user segmentation will be to predict the future revenue and growth of your organization.

Some of the major segmentation methods that you can use to make user segments in Braze are:

Apriori
Decile Analysis/ Pareto Analysis
Attitudinal research and Cluster Analysis
Need-based segmentationMore sophisticated methods that you can employ in your app’s segmentation for life stage and geodemographics are:
Experian mosaic
CACI’s ACoM classification systems
Intercom, Zendesk for User support, tickets and customer service
SDKs such as Intercom and Zendesk will allow your customers to directly connect with your customer’s support team. The best part is these SDKs made it available by eliminating any type of needs for these shady webviews and email clients. Both Intercom and Zendesk can be customized on the basis of design needs for your user needs.

Intercom connects user and customer support team via a chat interface. In this way, users can connect to the customer support easily and at the same time, your customer support team can assist your users in a feasible manner.

Zendesk works in a way more different manner. It fetches relevant data about your user automatically such as OS type, OS version, OS API etc. Often users are hesitant in providing this type of Information. Zendesk makes it possible to provide this information to you without even bothering your users.

Apptentive for Ratings and Review promptly
Ever faced challenges in getting your users to leave a review for your app?

Apptentive makes it easier for you to know your user’s sentiments before asking them to review or rate your app. It allows you talk in-app with your customers. A proprietary parameter called “Love score” is a feature of Apptentive that allows you to see how well your app is being perceived by your users.

Love Score in Apptentive works on the following parameters:

App popularity vs others
Analysis of app reviews
Reviewer quality
Reviewer Bias
5-star ratio
Upsight for KPI’s
Upsight brings metrics explorer which allows an app developer to understand how different variables affect their core KPI’s. The metric explorer further allows merging different marketing campaigns, user behaviors and user characteristics to understand how they impact the KPIs.

Upsight is a popular solution for tracking following KPIs inside your mobile app such as:

user interaction,
time spent in the app,
time spent using a feature
any kind of custom metrics using the Upsight SDK
Urban Airship for push notifications
In-app Notifications or push notifications are an important part of an app like Airbnb. For example, you may need to notify a host about the latest booking on his account or a recent message by Guest.

A push notification service should be scalable enough to send push notifications to over millions of subscribers.

Do you know that Urban Airship scaled its push notification services to 2.5 billion apps during elections?

Yes, you read that right. Urban Airship has a dedicated SDK which can be seamlessly integrated with your app for sending Push Notifications.
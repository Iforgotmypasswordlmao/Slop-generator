const video_view = document.getElementById("video-views");
const video_date = document.getElementById("video-date");
const pfp_image = document.getElementById("pfp-image");
const title_name = document.getElementById("title-name");
const channel_name = document.getElementById("channel-name");
const thumbnail_image = document.getElementById("thumbnail-image");
const link = document.getElementById("yt-link");
const context = thumbnail_image.getContext("2d");

const chooseRandomly = (arr) => {return arr[Math.floor(Math.random() * arr.length)]};

/**
 * @param {string} ytUrl 
 */
async function request(ytUrl)
{
    return await fetch(`https://noembed.com/embed?url=${ytUrl}`).then(response => response.json());
};

class reactionSlop
{
    /**
     * @param {object} videoData - youtube video url
     * @param {object} reactor - reaction channel
     * @param {string} reactor.name - reaction channel name
     * @param {string} reactor.image - reaction channel image
     * @param {Array[string]} reactor.reactions - images of reactors reacting
     */
    constructor(videoData, reactor)
    {
        this.reactor = reactor
        this.videoData = videoData
        this.exist = videoData['error'] == undefined
        channel_name.innerHTML = this.reactor.name
        pfp_image.src = this.reactor.image
        if (!this.exist)
        {
            this.videoData['title'] = "a youtube video that does not exist. Enter a valid link"
            this.videoData['thumbnail_url'] = "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1"
        }
    }

    generateTitle()
    {
        const videoTitle = this.videoData['title']
        const titles = [
            `${this.reactor.name} reacts to ${videoTitle}`,
            `Reacting to ${videoTitle}`,
            `${this.reactor.name} watches ${videoTitle}`
        ]

        title_name.innerText = chooseRandomly(titles)
    }

    generateViews()
    {
        const millions = Math.floor(Math.random()*30 + 10)/10
        const thousands = Math.floor(Math.random()*1000)
        let c = Math.random() < 0.5

        const times = [
            ["hours", 23],
            ["days", 6],
            ["weeks", 3],
            ["months", 11],
            ["years", 2]
        ]
        const time = times[Math.floor(Math.random()*5)]
        const timeInterval = Math.ceil(Math.random()*time[1])
        
        video_view.innerText = `${c ? millions : thousands}${c ? 'M' : 'K'} views`
        video_date.innerText = `${timeInterval} ${timeInterval == 1 ? time[0].replace("s", "") : time[0]} ago`
        
    }

    generateThumbnail()
    {
        const videoImage = new Image()
        videoImage.onload = () => {
            context.drawImage(videoImage, 0, 0, 640, 360)
        }
        videoImage.src = this.videoData['thumbnail_url']
        
        const left = (Math.random() < 0.5)
        const reactionImage = new Image()
        reactionImage.onload = () => {
            const width = reactionImage.naturalWidth > 210 ? 200 : reactionImage.naturalWidth
            context.drawImage(reactionImage, 
                left ? 0 : 640, 
                360, 
                left ? width : -width, 
                reactionImage.naturalHeight > 360 ? -250 : -reactionImage.naturalHeight)
        }
        reactionImage.src = chooseRandomly(this.reactor.reactions)
    }
}

async function main()
{
    const reactorsChannel = await fetch("../assets/reactions.json").then(response => response.json())
    let videoData = await request("https://www.youtube.com/watch?v=hVUehV0XQ_0&t=7s")
    let prevLink = ""
    
    let thumbnail = new reactionSlop(videoData, chooseRandomly(reactorsChannel))
    thumbnail.generateViews()
    thumbnail.generateTitle()
    thumbnail.generateThumbnail()

    document.getElementById("generate").addEventListener("click", async (event) =>{
        if (!(prevLink == link.value))
        {
            videoData = await request(link.value)
        }
        else
        {
            prevLink = link.value
        }
        thumbnail = new reactionSlop(videoData, chooseRandomly(reactorsChannel))
        thumbnail.generateTitle()
        thumbnail.generateViews()
        thumbnail.generateThumbnail()
    })
}

window.onload = () => {
    main()
}

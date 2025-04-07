
const thumbnail_image = document.getElementById("thumbnail-image")
const pfp_image = document.getElementById("pfp-image")
const title_name = document.getElementById("title-name")
const channel_name = document.getElementById("channel-name")
const video_view = document.getElementById("video-views")
const video_date = document.getElementById("video-date")
const chooseRandomly = (arr) => {return arr[Math.floor(Math.random() * arr.length)]}

class Slop
{
    /** 
     * @param {object} payload - payload for the slop thumbnail
     * @param {string} payload.person - person to be mentioned in the title
     * @param {string} payload.image - file path for the thumbnail\
     * 
     * @param {object} channel - channel making the video
     * @param {string} channel.name - name of the channel
     * @param {Array[string]} channel.images - channel pfp
     */
    constructor(payload, channel)
    {
        this.payload = payload
        this.channel = channel
        this.situation = ['situation', 'drama', 'response', 'new video', 'beef']
        this.insane = ['insane', 'crazy', 'awful', 'bad', 'goofy', 'horrible', 'massive', 'huge', 'hilarious', 'sad']

        thumbnail_image.src = chooseRandomly(this.payload.images)

        pfp_image.src = this.channel.image
        channel_name.innerHTML = this.channel.name
    }

    generateTitle()
    {
        const noun = chooseRandomly(this.situation)
        const adjective = chooseRandomly(this.insane)
        const name = this.payload.person

        const titles = [
            `The ${name} ${noun} is ${adjective}`,
            `${adjective} ${name} ${noun}`,
            `My thoughts on the ${name} ${noun}`,
            `${name} is finished`,
            `The ${adjective} ${name} ${noun}`
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

}

async function main()
{
    const channels = await fetch("./assets/channels.json").then(response => response.json())
    const videos = await fetch("./assets/videos.json").then(response => response.json())
    
    let thumbnail = new Slop(chooseRandomly(videos), chooseRandomly(channels))
    thumbnail.generateTitle()
    thumbnail.generateViews()

    document.getElementById("generate").addEventListener("click", (event) =>{
        thumbnail = new Slop(chooseRandomly(videos), chooseRandomly(channels))
        thumbnail.generateTitle()
        thumbnail.generateViews()
    })

}

window.onload = () => {
    main()
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnimeService } from '../services/anime.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.scss']
})
export class AnimeDetailComponent implements OnInit {

  anime;
  error;

  constructor(private animeService: AnimeService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.useMockResponse();
    this.getAnimeDetails();

  }

  getAnimeDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.animeService.getById(id).subscribe(
      (data: any) => {
        this.anime = data['anime'] || {};
      },  
      error => this.error = error
    );
  }

  useMockResponse(){
    this.anime = {"request_hash":"request:anime:f2699ee2da4aa46e26b75b41e7565803b96b4297","request_cached":true,
                  "request_cache_expiry":46037,"mal_id":9253,"url":"https://myanimelist.net/anime/9253/Steins_Gate",
                  "image_url":"https://cdn.myanimelist.net/images/anime/5/73199.jpg",
                  "trailer_url":"https://www.youtube.com/embed/27OZc-ku6is?enablejsapi=1&wmode=opaque&autoplay=1",
                  "title":"Steins;Gate","title_english":"Steins;Gate","title_japanese":"STEINS;GATE","title_synonyms":[],
                  "type":"TV","source":"Visual novel","episodes":24,"status":"Finished Airing","airing":false,
                  "aired":{"from":"2011-04-06T00:00:00+00:00","to":"2011-09-14T00:00:00+00:00","prop":{"from":{"day":6,"month":4,"year":2011},"to":{"day":14,"month":9,"year":2011}},"string":"Apr 6, 2011 to Sep 14, 2011"},
                  "duration":"24 min per ep","rating":"PG-13 - Teens 13 or older","score":9.13,"scored_by":663913,"rank":3,"popularity":7,"members":1199649,
                  "favorites":108790,"synopsis":"The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he indulges himself in his hobby of inventing prospective \"future gadgets\" with fellow lab members: Mayuri Shiina, his air-headed childhood friend, and Hashida Itaru, a perverted hacker nicknamed \"Daru.\" The three pass the time by tinkering with their most promising contraption yet, a machine dubbed the \"Phone Microwave,\" which performs the strange function of morphing bananas into piles of green gel. Though miraculous in itself, the phenomenon doesn't provide anything concrete in Okabe's search for a scientific breakthrough; that is, until the lab members are spurred into action by a string of mysterious happenings before stumbling upon an unexpected success—the Phone Microwave can send emails to the past, altering the flow of history. Adapted from the critically acclaimed visual novel by 5pb. and Nitroplus, Steins;Gate takes Okabe through the depths of scientific theory and practicality. Forced across the diverging threads of past and present, Okabe must shoulder the burdens that come with holding the key to the realm of time. [Written by MAL Rewrite]",
                  "background":"Steins;Gate is based on 5pb. and Nitroplus' .","premiered":"Spring 2011","broadcast":"Wednesdays at 02:05 (JST)",
                  "related":{"Adaptation":[{"mal_id":17517,"type":"manga","name":"Steins;Gate","url":"https://myanimelist.net/manga/17517/Steins_Gate"}],"Alternative setting":[{"mal_id":4975,"type":"anime","name":"ChäoS;HEAd","url":"https://myanimelist.net/anime/4975/ChäoS_HEAd"},{"mal_id":13599,"type":"anime","name":"Robotics;Notes","url":"https://myanimelist.net/anime/13599/Robotics_Notes"},{"mal_id":30485,"type":"anime","name":"ChäoS;Child","url":"https://myanimelist.net/anime/30485/ChäoS_Child"},{"mal_id":32962,"type":"anime","name":"Occultic;Nine","url":"https://myanimelist.net/anime/32962/Occultic_Nine"}],"Sequel":[{"mal_id":10863,"type":"anime","name":"Steins;Gate: Oukoubakko no Poriomania","url":"https://myanimelist.net/anime/10863/Steins_Gate__Oukoubakko_no_Poriomania"}],"Other":[{"mal_id":27957,"type":"anime","name":"Steins;Gate: Soumei Eichi no Cognitive Computing","url":"https://myanimelist.net/anime/27957/Steins_Gate__Soumei_Eichi_no_Cognitive_Computing"}],"Alternative version":[{"mal_id":32188,"type":"anime","name":"Steins;Gate: Kyoukaimenjou no Missing Link - Divide By Zero","url":"https://myanimelist.net/anime/32188/Steins_Gate__Kyoukaimenjou_no_Missing_Link_-_Divide_By_Zero"}]},
                  "producers":[{"mal_id":61,"type":"anime","name":"Frontier Works","url":"https://myanimelist.net/anime/producer/61/Frontier_Works"},{"mal_id":108,"type":"anime","name":"Media Factory","url":"https://myanimelist.net/anime/producer/108/Media_Factory"},{"mal_id":166,"type":"anime","name":"Movic","url":"https://myanimelist.net/anime/producer/166/Movic"},{"mal_id":238,"type":"anime","name":"AT-X","url":"https://myanimelist.net/anime/producer/238/AT-X"},{"mal_id":352,"type":"anime","name":"Kadokawa Pictures Japan","url":"https://myanimelist.net/anime/producer/352/Kadokawa_Pictures_Japan"},{"mal_id":459,"type":"anime","name":"Nitroplus","url":"https://myanimelist.net/anime/producer/459/Nitroplus"}],
                  "licensors":[{"mal_id":102,"type":"anime","name":"Funimation","url":"https://myanimelist.net/anime/producer/102/Funimation"}],
                  "studios":[{"mal_id":314,"type":"anime","name":"White Fox","url":"https://myanimelist.net/anime/producer/314/White_Fox"}],
                  "genres":[{"mal_id":41,"type":"anime","name":"Thriller","url":"https://myanimelist.net/anime/genre/41/Thriller"},{"mal_id":24,"type":"anime","name":"Sci-Fi","url":"https://myanimelist.net/anime/genre/24/Sci-Fi"}],
                  "opening_themes":["\"Hacking to the Gate\" by Kanako Itou"],"ending_themes":["\"Toki Tsukasadoru Juuni no Meiyaku (刻司ル十二ノ盟約)\" by Yui Sakakibara (eps 1-21)","\"Fake Verthandi\" by Takeshi Abo (ep 22)","\"Sky Clad no Kansokusha (スカイクラッドの観測者)\" by Kanako Itou (ep 23)","\"Another Heaven\" by Kanako Itou (ep 24)"]
                };
  }

}

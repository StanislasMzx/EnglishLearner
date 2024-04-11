<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Quizz;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::factory()->create(
            [
                'email' => 'user@default.com',
                'password' => Hash::make('password'),
                'name' => 'Admin',
            ]);
        $thumbnails = [
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmakeupbyazadig.fr%2Fwp-content%2Fuploads%2F2020%2F09%2Frevue-article-meilleures-series-netflix-2020-2021-makeupbyazadig-top-horreur-comedie-aventure-magique-amour-romantique-the-order-magie-2.jpg&f=1&nofb=1&ipt=5d04fc239e55ec7d4c5778489f1379acc178ef1a75cdcb5576856b6b89866f39&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftownsquare.media%2Fsite%2F252%2Ffiles%2F2021%2F02%2Fqueens-gambit-best-netflix-shows.jpg%3Fw%3D1200%26h%3D0%26zc%3D1%26s%3D0%26a%3Dt%26q%3D89&f=1&nofb=1&ipt=284ce5ce61e0092917ad7a07a7e1e3233bb50062ac2e002e27fd88e13f150ebe&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffilmdaily.co%2Fwp-content%2Fuploads%2F2020%2F01%2Fgayshows-lede.jpg&f=1&nofb=1&ipt=05107f1f19abf6805c5103ac83f83d5d5fcfea9785c89027753232ba1316512f&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.technadu.com%2Fwp-content%2Fuploads%2F2021%2F01%2FJames-Bond.jpg&f=1&nofb=1&ipt=88d12ab8e8ce10e0ec3542c13b59f4d316e753364f01543ff7664c1022268a97&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic2.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2020%2F10%2FThe-Big-Bang-Theory-header-Cropped.jpg&f=1&nofb=1&ipt=e345eb0ad6f574e7e8d4f9865dad3839ecd47207dccadc2a7ee898b31a5ffb23&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic0.srcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2018%2F11%2FThe-Big-Bang-Theory-on-CBS.jpg&f=1&nofb=1&ipt=4258da3bcd5a32111961e48fa8b9e38b2f7c43f2c13d0a70746999f728fca6ca&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FyUa0iCocBPsGJ79BwrshHqz45Qc.jpg&f=1&nofb=1&ipt=7c7abe76354a777de2d7cc74601660851af2f6720533cd71a8c322ca22d0c3df&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F2840376.jpg&f=1&nofb=1&ipt=1744daa26f214b8ff511eaea09fd1f8b7a7d03126c364b3496b574b5b424fe8d&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F03%2F09%2F180053-Interstellar_movie-film_stills-movies.jpg&f=1&nofb=1&ipt=60e6e287ee90c6172f1bb8b119c8668eb0d6245f6680737f606ec28deae46fbb&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthisisfilm.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fde0v189-ba4baa5a-0e4f-418b-b99b-3d918b63847e.jpg&f=1&nofb=1&ipt=dd2b238e5420244f3743654f3864a85fef95ff3e1a0253c9b93c80f8fd04efa9&ipo=images',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdwallpaper.nu%2Fwp-content%2Fuploads%2F2018%2F02%2Firon_man-18.jpg&f=1&nofb=1&ipt=675d4c27899c96d3992135651c485e1da89b313a014d87e6ae07f9f2e3dc0ed5&ipo=images',
        ];
        $quizzs = Quizz::factory()->count(20)->create();

        foreach ($quizzs as $quizz) {
            $quizz->thumbnail = $thumbnails[array_rand($thumbnails)];
            $quizz->save();
        }
    }
}

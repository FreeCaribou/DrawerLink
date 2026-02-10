<?php

namespace Database\Seeders;

use App\Models\Draw;
use App\Models\SavedLink;
use App\Models\SavedObject;
use App\Models\SavedObjectProp;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $primaryUser = User::firstOrCreate(
            ['email' => 'drawerlink@freecaribou.net'],
            [
                'name' => 'Freecaribou',
                'password' => 'helloworld',
                'email_verified_at' => now(),
            ]
        );

        $userTwo = User::firstOrCreate(
            ['email' => 'johndoe@freecaribou.net'],
            [
                'name' => 'Johndoe',
                'password' => 'helloworld',
                'email_verified_at' => now(),
            ]
        );

        $drawOne = Draw::create(['label' => 'Politic', 'user_id' => $primaryUser->id]);
        $drawTwo = Draw::create(['label' => 'Science', 'user_id' => $primaryUser->id]);
        $drawOneBis = Draw::create(['label' => 'Politic Bis', 'user_id' => $userTwo->id]);

        $savedLinkOne = SavedLink::create(['label' => 'Two stupid links about stupid politicians', 'user_id' => $primaryUser->id, 'draw_id' => $drawOne->id]);
        $savedLinkTwo = SavedLink::create(['label' => 'Tax the Rich', 'description' => 'And other good idea', 'user_id' => $primaryUser->id, 'draw_id' => $drawOne->id]);
        $savedLinkThree = SavedLink::create(['label' => 'You will not believe what you will see', 'description' => 'So ? You believe it or not ?', 'user_id' => $userTwo->id, 'draw_id' => $drawOneBis->id]);
        $savedLinkFour = SavedLink::create(['label' => 'Tax the scientific', 'user_id' => $primaryUser->id, 'draw_id' => $drawTwo->id]);

        $savedObjectPropOne = SavedObjectProp::create(['name' => 'document_one.pdf', 'mime_type' => 'application/pdf', 'saved_link_id' => $savedLinkOne->id, 'size' => 12456]);
        $savedObjectPropTwo = SavedObjectProp::create(['name' => 'document_two.pdf', 'mime_type' => 'application/pdf', 'saved_link_id' => $savedLinkOne->id, 'size' => 0]);

        $savedObjectPropThree = SavedObjectProp::create(['name' => 'document_three.pdf', 'mime_type' => 'application/pdf', 'saved_link_id' => $savedLinkThree->id, 'size' => 0]);
        $base64StringOne = 'JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQKMSAwIG9iago'.
            '8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9Db3VudCAxCi9La'.
            'WRzIFszIDAgUl0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMC'.
            'A1OTUuMjcgODQxLjg5XQovQ29udGVudHMgNSAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNiAwIFIKPj4KPj'.
            '4KPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCA0NQo+PgpzdHJlYW0KQlQgL0YxIDEyIFRmIDcyIDc2MCBUZCAoaGVsbG8gd29ybGQpIF'.
            'RqIEVUCmVuZHN0cmVhbQplbmRvYmoKNiAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL05hbWUgL0YxCi9CYXNlRm'.
            '9udCAvSGVsdmV0aWNhCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1'.
            'IGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDA2MCAwMDAwMCBuIAowMDAwMDAwMTIxIDAwMDAwIG4gCjAwMDAwMDAyNTkgMDAwMDA'.
            'gbiAKMDAwMDAwMDM4MCAwMDAwMCBuIAowMDAwMDAwNDg1IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1Jvb3QgMSAwIFIKL1N'.
            'pemUgNwo+PgpzdGFydHhyZWYKNTA2CiUlRU9GCg==';
        SavedObject::create(['content' => $base64StringOne, 'saved_object_prop_id' => $savedObjectPropOne->id]);
        SavedObject::create(['content' => $base64StringOne, 'saved_object_prop_id' => $savedObjectPropTwo->id]);
        SavedObject::create(['content' => $base64StringOne, 'saved_object_prop_id' => $savedObjectPropThree->id]);

        $tagOne = Tag::create(['label' => 'Marx']);
        $tagTwo = Tag::create(['label' => 'Useful']);
        $tagThree = Tag::create(['label' => 'Geopolitic']);

        $savedLinkOne->tags()->attach([$tagOne->id, $tagThree->id]);
    }
}

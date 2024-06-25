<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index()
    {
        return Video::query()->with("user")->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'boolean',
            'title' => 'required|string',
            'thumbnail' => 'required|mimes:png,jpg,jpeg',
            'video' => 'required|mimes:mp4'
        ]);

        $data['user_id'] = $request->user()->id;
        $data['title'] = $request->title;

        $thumbnail =  $data['thumbnail'] ?? null;
        $video =  $data['video'] ?? null;

        if ($thumbnail) {
            $relativePath = $this->saveThumbnail($thumbnail);
            $data['thumbnail'] = URL::to(Storage::url($relativePath));
        }

        if ($video) {
            $relativePath = $this->saveVideo($video);
            $data['video'] = URL::to(Storage::url($relativePath));
        }

        Video::create($data);
    }

    public function show($id)
    {
        $video = Video::query()->where('id', $id)->with('user')->get();
        $videos = Video::inRandomOrder()->with('user')->limit(20)->get();

        return response()->json([
            'video' => $video,
            'videos' => $videos
        ]);
    }

    private function saveThumbnail(UploadedFile $thumbnail)
    {
        $path = "thumbnails/" . Str::random();

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path, 0755, true);
        }

        if (!Storage::putFileAS('public/' . $path, $thumbnail, $thumbnail->getClientOriginalName())) {
            throw new \Exception("Unable to save image \"{$thumbnail->getClientOriginalName()}\"");
        }

        return $path . "/" . $thumbnail->getClientOriginalName();
    }

    private function saveVideo(UploadedFile $video)
    {
        $path = "videos/" . Str::random();

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path, 0755, true);
        }

        if (!Storage::putFileAS('public/' . $path, $video, $video->getClientOriginalName())) {
            throw new \Exception("Unable to save video \"{$video->getClientOriginalName()}\"");
        }

        return $path . "/" . $video->getClientOriginalName();
    }
}

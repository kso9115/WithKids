package com.child.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.child.project.entity.MealMngm;
import com.child.project.entity.MealMngmId;
import com.child.project.repository.MealMngmRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Log4j2
@Service
public class MealMngmServiceImpl implements MealMngmService {

    private final MealMngmRepository mealRepository;

    @Override
    public List<MealMngm> selectList() {

        return mealRepository.findAll();
    }

    @Override
    public List<MealMngm> selectListYM(String yearMonth) {

        return mealRepository.selectListYM(yearMonth);
    }

    @Override
    public MealMngm brfInsert(MealMngm entity) {

        // return mealRepository.save(memSerial , mealDate , memName ,staffNm, brfMeal);
        if (entity != null) {

            return mealRepository.save(entity);

        } else {
            return null;
        }
    }

    @Override
    public MealMngm selectOne(MealMngmId entityId) {

        Optional<MealMngm> result = mealRepository.findById(entityId);

        if (result.isPresent())
            return result.get(); // ver01
        else
            return null;
    }

}
